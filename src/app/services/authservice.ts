import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, Observable, BehaviorSubject, map, switchMap, catchError, of, finalize } from "rxjs";
import { AuthclientService  } from "./clients/authclient.service";
import { User, UserModel } from "../models/UserModel";
import { HSessions } from "../common/common-constants";
import { SessionService } from "./core/session.service";
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { NotifyService } from "./core/toast.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnDestroy {
    // private fields
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

    // // public fields
     currentUser$: Observable<User>;
     currentUserSubject: BehaviorSubject<User>;
    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;


    constructor(
        private tokenService: AuthclientService,
        private router: Router,
        private session: SessionService,
        private notifyService:NotifyService
    ) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
        this.currentUserSubject = new BehaviorSubject<User>(new User());
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    loginWithAzure(accessToken: string,PromoCode:string): Observable<User> {
        this.isLoadingSubject.next(true);
        return this.tokenService.getAuthToken({ AccessToken: accessToken, SSOClient: "Microsoft", PromoCode: PromoCode }).pipe(
            map(auth => {

                console.log(auth.Token);
                if(auth.IsSuccess == true)
                {
                   // this.notifyService.showToast("Login successfully. Redirecting....");
                this.session.setSessionItem(HSessions.AuthTokenKey,  JSON.stringify(auth));
                }
                else
                {
                    this.notifyService.showToast(auth.ErrorDetails ?? "Unable to login at the moment", true);
                }
                return true;
            }),
            switchMap(() => this.getUserByUserId()),
            catchError((err) => {
                console.error('err', err);
                this.notifyService.showToast(JSON.stringify(err),true);
                return this.getUserByUserId();
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }


    loginWithGoogle(idToken: string,PromoCode:string)
    {
        this.isLoadingSubject.next(true);
        return this.tokenService.getAuthToken({ AccessToken: idToken, SSOClient: "Google", PromoCode: PromoCode}).pipe(
            map(auth => {
                //console.log(auth.Token);
                if(auth.IsSuccess == true)
                {
                  //  this.notifyService.showToast("Login successfully. Redirecting....");
                this.session.setSessionItem(HSessions.AuthTokenKey,  JSON.stringify(auth));
                }
                else
                {
                    this.notifyService.showToast(auth.ErrorDetails ?? "Unable to login at the moment", true);
                }
                return true;
            }),
            switchMap(() => this.getUserByUserId()),
            catchError((err) => {
                this.notifyService.showToast(JSON.stringify(err),true);
                console.error('err', err);
                return this.getUserByUserId();
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    loginWithUsername(email: string,password:string)
    {
        this.isLoadingSubject.next(true);
        return this.tokenService.getAuthToken({ email: email, password:password}).pipe(
            map(auth => {
                //console.log(auth.Token);
                if(auth.IsSuccess == true)
                {
                  //  this.notifyService.showToast("Login successfully. Redirecting....");
                this.session.setSessionItem(HSessions.AuthTokenKey,  JSON.stringify(auth));
                }
                else
                {
                    this.notifyService.showToast(auth.ErrorDetails ?? "Unable to login at the moment", true);
                }
                return true;
            }),
            switchMap(() => this.getUserByUserId()),
            catchError((err) => {
                  alert("Login Fail");
                //  this.notifyService.showToast(JSON.stringify(err),true);
                 console.log('err'+ err);
                return this.getUserByUserId();
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }


    register(email:string, password_hash:string,role_id:number )
    {
        this.isLoadingSubject.next(true);
        return this.tokenService.registerUser({ email: email, password_hash: password_hash,role_id:role_id});
    }
    logout() {
    //   if(this.socialauthService.authState.subscribe(user=>{
    //     if(user != null)
    //     {
           // this.socialauthService.signOut();
    //     }
    //   }))
      
        this.session.removeSessionItem(HSessions.AuthTokenKey);
        this.router.navigate(['/authentication'], {
            queryParams: {},
        });
    }


    get currentUserValue(): User {
        return  this.session.getJWTUser();
    }

    getUserByUserId(): Observable<User> {
         const auth =  this.session.getSessionItem(HSessions.AuthTokenKey);
        this.isLoadingSubject.next(true);
        //return this.session.getJWTUserDetails();
        
        // return new Observable( resolve => {
        //     resolve.next(new User());
        // });
        return this.session.getJWTUserDetails().pipe(
            map(user => {
                if (user && (!user.isExpired)) {
                    this.currentUserSubject.next(user);
                } else {
                    this.logout();
                }
                return user;
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }



    // verifyOtp(otp: string) {
    //     this.isLoadingSubject.next(true);
    //     let auth = this.session.getSessionItem(HSessions.AuthTokenKey);

    //     return this.tokenService.validateOTP({ AuthToken: auth.AuthToken, OTP: otp }).pipe(
    //         map(verifyOtp => {
    //             auth.OTPVerified = verifyOtp.IsSuccess;
    //             auth.AuthToken = verifyOtp.AuthToken;
    //             this.session.setSessionItem(HSessions.AuthTokenKey, JSON.stringify(auth));
    //             return true;

    //         }),
    //         switchMap(() => this.getUserByUserId()),
    //         catchError((err) => {
    //             console.error('err', err);
    //             return of(undefined);
    //         }),
    //         finalize(() => this.isLoadingSubject.next(false))
    //     );
    // }

    forgotPassword(email: string): Observable<any> {
        let retObj = true;
        return of(retObj);
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

    RedirectToDashboard(originalUrl?: string){
        //this.router.navigate(['/dashboard']);
        if (originalUrl) {
            this.router.navigate(['/dashboard'], { queryParamsHandling: 'merge', queryParams: { url:originalUrl } });
          } else {
            this.router.navigate(['/dashboard']);
          }
    }
}

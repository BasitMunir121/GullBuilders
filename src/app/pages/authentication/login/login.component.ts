import { Input, Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MSAL_INSTANCE, MsalModule, MsalService } from '@azure/msal-angular';
import { BrowserCacheLocation, IPublicClientApplication, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { Subscription, first } from 'rxjs';
import { User } from 'src/app/models/UserModel';
import { AuthService } from 'src/app/services/authservice';
import { CoreService } from 'src/app/services/core/core.service';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  MicrosoftLoginProvider,
} from '@abacritt/angularx-social-login';
import { SessionService } from 'src/app/services/core/session.service';
import { HSessions } from 'src/app/common/common-constants';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  options = this.settings.getOptions();
  public isLoginWithAzure: boolean = false;
  hasError: boolean;
  errorType: string = 'danger';
  errorMessage: string = 'Your login attempt was not successful.';
  private unsubscribe: Subscription[] = [];
  loading = false;

  constructor(private authService: AuthService,
    private settings: CoreService,
    private route: ActivatedRoute,
    private router: Router,
    private azureAuthService: MsalService,
    private socialAuthService: SocialAuthService,
    private session: SessionService
  ) {

  }
  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required]),
  });
  get f() {
    return this.form.controls;
  }
  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/dashboards/dashboard1']);
  }
  @ViewChild('googleBtnRef')
  googleBtn?: ElementRef;

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      var currentUser= this.session.getJWTUser();
      if (currentUser == null || currentUser.isExpired) {
        if(currentUser)
        {
          try{
        this.session.removeSessionItem(HSessions.AuthTokenKey);
          }catch(error)
          {
            
          }
        }
        var loggedIn = (user != null);
        if (loggedIn) {
          let promoCode = '';
          this.route.queryParams.subscribe((params) => {
            promoCode = params['promo'] || '';
          });
          if (user.provider == GoogleLoginProvider.PROVIDER_ID) {
            //console.log(user.idToken)
            const loginSubscr = this.authService.loginWithGoogle(user.idToken,promoCode).pipe(first()).subscribe(user => {
              this.handleLoginRequest(user);
            });
          }
        }
        //this.unsubscribe.push(loginSubscr);
      }
    });
  }

  // LoginWithMicrosoft() {
  //   this.isLoginWithAzure = true;
  //   this.hasError = false;
  //   this.loading = true;

  //   this.socialAuthService.signIn(MicrosoftLoginProvider.PROVIDER_ID).then((user: SocialUser) => {

  //     console.log(user.authToken)
  //     const loginSubscr = this.authService.loginWithAzure(user.authToken).pipe(first()).subscribe(user1 => {
  //       this.loading = true;
  //       this.handleLoginRequest(user1);
  //     });
  //     this.unsubscribe.push(loginSubscr);

  //   });


  //   // this.azureAuthService.initialize().subscribe(a=>{
  //   //     this.azureAuthService.loginPopup()
  //   //       .subscribe(resp => {
  //   //         console.log(resp);
  //   //         const loginSubscr = this.authService
  //   //           .loginWithAzure(resp.accessToken)
  //   //           .pipe(first())
  //   //           .subscribe(user => {
  //   //             this.handleLoginRequest(user);
  //   //           });
  //   //         this.unsubscribe.push(loginSubscr);
  //   //       });
  //   //     });
  // }



  // private handleLoginRequest(user: User) {
  //   //let auth = this.session.getSessionItem(HSessions.AuthTokenKey) as TokenOuputModel;
  //   //this.router.navigate(["/dashboard"]);
  //   this.route.queryParams.subscribe(params => {
  //     // Retrieve URL parameters
  //     const urlParams = new URLSearchParams();
  //     Object.keys(params).forEach(key => {
  //       urlParams.append(key, params[key]);
  //     });

  //     this.router.navigate(['/dashboard'], {
  //       queryParams: { ...params },
  //       queryParamsHandling: 'merge'
  //     });
  //   });
  // }
  private handleLoginRequest(user: User) {
    this.route.queryParams.subscribe(params => {
      // Retrieve URL parameters
      const urlParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        urlParams.append(key, params[key]);
      });
      const referrer = document.referrer;
      const promoValue = params['promo'];
      if (promoValue) {
        sessionStorage.setItem('promo', promoValue);
      }else{
        sessionStorage.removeItem('promo');
      }
      urlParams.append('referrer', referrer);
      if (referrer=="https://www.3u.gg/") {
        this.router.navigate(['/dashboard'], {
          queryParams: { ...params },
          queryParamsHandling: 'merge'
        });
      } else {
        // this.router.navigate(["/dashboard"]);
        this.router.navigate(["/analytics"]);
      }
    });
  }

  @Input() error: string | null = '';
}
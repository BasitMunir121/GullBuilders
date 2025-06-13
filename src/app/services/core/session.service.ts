import { Injectable } from '@angular/core';
//import { TokenOuputModel } from 'src/app/models/token/token.model';
import { HSessions } from '../../common/common-constants';
import { AuthResponseDto, User } from 'src/app/models/UserModel';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor() { }

    setSessionItem(key: any, value: any) {
        localStorage.setItem(key, value);
    }

    getSessionItem(key: any) {
        try {
            const data = JSON.parse(
                localStorage.getItem(key)!
            );
            return data;
        } catch (error) {
            // console.error(error);
            return null;
        }
    }

    removeSessionItem(key: any) {
        localStorage.removeItem(key);
    }

    // getJwtClaim(key: string): string {
    //     let authToken: AuthResponseDto = this.getSessionItem(HSessions.AuthTokenKey);
    //     let base64Payload = authToken.Token?.split('.')[1] ?? "";
    //     let payloadBuffer = atob(base64Payload);
    //     let claimData = JSON.parse(payloadBuffer.toString());   
    //     var user: User = JSON.parse(claimData['user']);
    //     return user[key];
    // }

    getJWTUserDetails(): Observable<User>
    {
        return new Observable( resolve => {
            let authToken: AuthResponseDto = this.getSessionItem(HSessions.AuthTokenKey);
            let base64Payload = authToken.Token?.split('.')[1] ?? "";
            let payloadBuffer = atob(base64Payload);
            var claimData = JSON.parse(payloadBuffer.toString());   
            var user: User = JSON.parse(claimData['user']);
            user.isExpired= (parseInt(claimData['exp'] ?? "00000000") * 1000) < Date.now();
            resolve.next(user);
        });
    }

    getJWTUser():User{
        let authToken: AuthResponseDto = this.getSessionItem(HSessions.AuthTokenKey);
        if(authToken){
        let base64Payload = authToken.Token?.split('.')[1] ?? "";
        let payloadBuffer = atob(base64Payload);
        var claimData = JSON.parse(payloadBuffer.toString());   
        var user: User = JSON.parse(claimData['user']);
        user.isExpired= (parseInt(claimData['exp'] ?? "00000000") * 1000) < Date.now();
        return user;
        }
        return new User();
    }
}

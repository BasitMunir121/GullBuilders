import { Injectable } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureTokenInputModel, TokenOuputModel } from 'src/app/models/AuthModel';
import { AuthResponseDto, User } from 'src/app/models/UserModel';
import { ConfigurationService } from 'src/app/common/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthclientService {

  constructor(private http: HttpClient) {
     //this.http= http;
  }

  
  getAuthToken(model: AzureTokenInputModel): Observable<AuthResponseDto> {
    let url =ConfigurationService.getConfig().loginUrl + '/auth'

    return this.http.post(url, JSON.stringify(model), {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json; charset=utf-8',
          'rejectUnauthorized': 'false' 
        }
      )
    });      
    
  }

  registerUser(model: any): Observable<User> {
    let url =ConfigurationService.getConfig().loginUrl + '/register'

    return this.http.post(url, JSON.stringify(model), {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json; charset=utf-8',
          'rejectUnauthorized': 'false' 
        }
      )
    }) as Observable<User>;      
    
  }

}

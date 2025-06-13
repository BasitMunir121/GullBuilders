import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import {  BehaviorSubject, Observable} from 'rxjs';
import * as CryptoJS from 'crypto-js'
import { GlobalSettings } from 'AuthConfig';
@Injectable({
  providedIn:"root",
  deps:[HttpClient]
  })
export class ConfigurationService  {
  public static configurations:BehaviorSubject<AppConfigDto>;

  public static InitializeConfigs(http: HttpClient) {
    ConfigurationService.configurations=new BehaviorSubject(GlobalSettings);
  }

public static getConfig()
{
  
  return GlobalSettings;
}

}

export class AppConfigDto
{
    GoogleClientID: string;
    ApiUrl:string;
    loginUrl:string;
    PlansList:any;
    PaypalAuth:any;
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { SessionService } from './session.service';
import { HSessions } from '../../common/common-constants';
import { ConfigurationService } from 'src/app/common/config.service';

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {
  private httpOptions: any;
  protected session: SessionService = new SessionService();
  private apiUrl: string;

  constructor(@Inject(String) private apiPrefix: string, private dataHttp: HttpClient) {
    this.initDataService();
    
  }

  protected get<T>(queryParams?: any, appendOrOverwriteUrl?: string): Observable<T> {
    this.addRequestHeaders();

    let url = this.apiUrl + '/';

    if (this.apiPrefix)
      url += this.apiPrefix + '/';

    if (appendOrOverwriteUrl) {
      if (appendOrOverwriteUrl.startsWith('~'))
        url = this.apiUrl + '/' + appendOrOverwriteUrl.replace('~', '');
      else
        url += appendOrOverwriteUrl;
    }

    // add query params
    if (queryParams) {
      let params = new URLSearchParams();
      for (let key in queryParams) {
        params.set(key, queryParams[key]);
      }
      if (params)
        url += "?" + params.toString();
    }

    return this.dataHttp.get<T>(url, this.httpOptions as object);
  }

  protected getAsPromise<T>(queryParams?: any, appendOrOverwriteUrl?: string): Promise<T> {
    this.addRequestHeaders();

    let url = this.apiUrl + '/';

    if (this.apiPrefix)
      url += this.apiPrefix + '/';

    if (appendOrOverwriteUrl) {
      if (appendOrOverwriteUrl.startsWith('~'))
        url = this.apiUrl + '/' + appendOrOverwriteUrl.replace('~', '');
      else
        url += appendOrOverwriteUrl;
    }

    // add query params
    if (queryParams) {
      let params = new URLSearchParams();
      for (let key in queryParams) {
        params.set(key, queryParams[key]);
      }
      if (params)
        url += "?" + params.toString();
    }

    return firstValueFrom(this.dataHttp.get<T>(url, this.httpOptions as object));
  }



  protected post(input: any, appendOrOverwriteUrl?: string): Observable<any> {
    this.addRequestHeaders();

    let url = this.apiUrl + '/' + this.apiPrefix + '/';

    if (appendOrOverwriteUrl) {
      if (appendOrOverwriteUrl.startsWith('~'))
        url = this.apiUrl + '/' + appendOrOverwriteUrl.replace('~', '');
      else
        url += appendOrOverwriteUrl;
    }

    console.log(this.dataHttp.post(url, JSON.stringify(input), this.httpOptions));
    return this.dataHttp.post(url, JSON.stringify(input), this.httpOptions);
  }

  protected put(input: any, appendOrOverwriteUrl?: string): Observable<any> {
    this.addRequestHeaders();

    let url = this.apiUrl + '/' + this.apiPrefix + '/';

    if (appendOrOverwriteUrl) {
      if (appendOrOverwriteUrl.startsWith('~'))
        url = this.apiUrl + '/' + appendOrOverwriteUrl.replace('~', '');
      else
        url += appendOrOverwriteUrl;
    }

    return this.dataHttp.put(url, JSON.stringify(input), this.httpOptions);
  }

  protected delete(appendOrOverwriteUrl?: any): Observable<any> {
    this.addRequestHeaders();

    let url = this.apiUrl + '/' + this.apiPrefix + '/';

    let appendOrOverwriteUrlString: string = appendOrOverwriteUrl + '';

    if (appendOrOverwriteUrlString) {
      if (appendOrOverwriteUrlString.startsWith('~'))
        url = this.apiUrl + '/' + appendOrOverwriteUrlString.replace('~', '');
      else
        url += appendOrOverwriteUrlString;
    }


    return this.dataHttp.delete(url, this.httpOptions);
  }

  protected deleteWithBody(input?: any, appendOrOverwriteUrl?: string): Observable<any> {
    this.addRequestHeaders();

    let url = this.apiUrl + '/' + this.apiPrefix + '/';

    if (appendOrOverwriteUrl) {
      if (appendOrOverwriteUrl.startsWith('~'))
        url = this.apiUrl + '/' + appendOrOverwriteUrl.replace('~', '');
      else
        url += appendOrOverwriteUrl;
    }

    if (input)
      this.httpOptions.body = input;

    return this.dataHttp.delete(url, this.httpOptions);
  }

  protected deleteWithParams(queryParams?: any, appendOrOverwriteUrl?: string): Observable<any> {
    this.addRequestHeaders();

    let url = this.apiUrl + '/' + this.apiPrefix + '/';

    if (appendOrOverwriteUrl) {
      if (appendOrOverwriteUrl.startsWith('~'))
        url = this.apiUrl + '/' + appendOrOverwriteUrl.replace('~', '');
      else
        url += appendOrOverwriteUrl;
    }

    // add query params
    if (queryParams) {
      let params = new URLSearchParams();
      for (let key in queryParams) {
        params.set(key, queryParams[key]);
      }
      if (params)
        url += "?" + params.toString();
    }

    return this.dataHttp.delete(url, this.httpOptions);
  }

  private addRequestHeaders() {
    this.initDataService();

     var token = this.session.getSessionItem(HSessions.AuthTokenKey);
    var lang = 'en';//this.session.getSessionItem(HSessions.Language) ?? HLanguages.English;

    if (token) {
      this.httpOptions = {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + token.Token,
            'rejectUnauthorized': 'false',
            'Language': lang
          }
        )
      }
    } else {
      this.httpOptions = {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json; charset=utf-8',
            'rejectUnauthorized': 'false' 
          }
        )
      }
    }
  }

  private initDataService() {
    // this.apiUrl =ConfigurationService.getConfig().ApiUrl;
    this.apiUrl = 'http://192.168.0.87:9500'
  }
}

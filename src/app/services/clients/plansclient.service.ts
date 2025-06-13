import { Injectable } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureTokenInputModel, TokenOuputModel } from 'src/app/models/AuthModel';
import { User } from 'src/app/models/UserModel';
import { HCResponse, PaginationModel, StatusModel } from 'src/app/models/shared/PaginationModel';
import { AddForwardUrl, UpdateForwardURL, urlForwarders } from 'src/app/models/UrlForwarder';
import { ListPlanModel } from 'src/app/models/PlanModel';

@Injectable({
  providedIn: 'root'
})
export class PlansClientService extends DataService<any> {

  constructor(http: HttpClient) {
    super("plans", http);
  }

  getPlans(): Observable<HCResponse> {
    return this.get();
  }

}

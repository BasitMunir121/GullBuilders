import { Injectable } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureTokenInputModel, TokenOuputModel } from 'src/app/models/AuthModel';
import { User } from 'src/app/models/UserModel';
import { HCResponse, PaginationModel, StatusModel } from 'src/app/models/shared/PaginationModel';
import { AddBrandedOrganizationModel, AddOrganizationModel, AddOrganizationUrlModel, ListOrganizationModel, OrganizationModel, OrganizationPlanUpdateModel, OrganizationStatsModel, PromoConfigModel } from 'src/app/models/organizationModel';
import { urlForwarders } from 'src/app/models/UrlForwarder';

@Injectable({
  providedIn: 'root'
})
export class OrganizationClientService extends DataService<any> {

  constructor(http: HttpClient) {
    super("organizations", http);
  }



  getOrganizations(model: PaginationModel): Observable<HCResponse> {
    return this.get(model);
  }
  
  getOrganizationsAsPromise(model:PaginationModel):Promise<ListOrganizationModel>
  {
    return this.getAsPromise(model);
  }

  getOrganizationDetail(orgId:number): Observable<HCResponse> {
    return this.get("",orgId.toString());
  }

  getOrganizationUrls(model:PaginationModel, orgId:number):Observable<HCResponse>
  {
    return this.get(model,orgId.toString()+'/forwardurls')
  }
  getOrganizationStats(orgId:number): Observable<HCResponse> 
  {
    return this.get("",orgId.toString()+'/stats')
  }
  addOrganizationUrls(model:AddOrganizationUrlModel):Observable<HCResponse>
  {
    return this.post(model,model.OrganizationID.toString()+'/addurl')
  }
  addOrganization(model:AddOrganizationModel):Observable<StatusModel>
  {
    return this.post(model)
  }
  addBrandedOrganization(model:AddBrandedOrganizationModel):Observable<StatusModel>
  {
    return this.post(model)
  }
  updateOrganizationPlan(model:OrganizationPlanUpdateModel):Observable<StatusModel>
  {
    return this.put(model,model.OrganizationID.toString()+'/upgradeplan')
  }
  getIsPromoAllowed(): Observable<HCResponse> {
    return this.get("",'~IsPromoAllowed');
  }
  getValidatePromo(promoCode: string): Observable<HCResponse> {
    return this.get("",'~ValidatePromo?promoCode='+promoCode);
  }
}
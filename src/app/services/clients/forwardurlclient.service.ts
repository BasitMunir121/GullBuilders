import { Injectable } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureTokenInputModel, TokenOuputModel } from 'src/app/models/AuthModel';
import { User } from 'src/app/models/UserModel';
import { HCResponse, PaginationModel, StatusModel } from 'src/app/models/shared/PaginationModel';
import { AddForwardUrl, AvailableUrl, FreeUrlCount, GetUrlTrackParamModel, UpdateForwardURL, UrlTrackParamListAddModel, urlForwarders, urlTrackParamListModel,URLPayModel, UpdateForwardURLSubscriptionModel } from 'src/app/models/UrlForwarder';

@Injectable({
  providedIn: 'root'
})
export class ForwardurlclientService extends DataService<any> {

  constructor(http: HttpClient) {
    super("forwardurls", http);
  }



  getForwardUrls(model: PaginationModel): Observable<HCResponse> {
    return this.get(model);
  }

  getFreeForwardUrlsCount(): Observable<FreeUrlCount> {
    return this.get(null, '~userurls/free');
  }

  getIsAvailableUrl(model:AvailableUrl): Observable<StatusModel> {
    return this.get(model, '~urls/isAvailable');
  } 
  addForwardUrl(model: AddForwardUrl): Observable<HCResponse>
  {
    return this.post(model);
  }

  updateForwardUrl(model: UpdateForwardURL): Observable<HCResponse>
  {
    return this.put(model,model.ForwardUrlId.toString());
  }
  addTrackParam(model:UrlTrackParamListAddModel):Observable<HCResponse>
  {
    return this.put(model,model.URLForwarderID.toString()+'/queryParams')
  }
  updateTrackParam(model:UrlTrackParamListAddModel):Observable<HCResponse>
  {
    return this.put(model,model.URLForwarderID.toString()+'/queryParams')
  }

  getTrackParam(model:GetUrlTrackParamModel):Promise<HCResponse>
  {
    return this.getAsPromise(model,model.URLForwarderID+'/queryParams');
  }

  purchasePlan(model:URLPayModel):Observable<HCResponse>
  {
    return this.put(model,model.URLForwarderID.toString()+'/purchaseurl')
  }
  subscribePlan(model:UpdateForwardURLSubscriptionModel):Observable<HCResponse>
  {
    return this.put(model,model.ForwardUrlId.toString()+'/subscription')
  }
  unsubscribePlan(urlForwardId:number):Observable<HCResponse>
  {
    return this.delete(urlForwardId.toString()+'/subscription')
  }

  orderPlan():Observable<StatusModel>
  {
    return this.post(null,'~orders');
  }
  captureOrderPlan(model:UpdateForwardURLSubscriptionModel):Observable<StatusModel>
  {
    return this.post(model, '~orders/'+model.SubscriptionID.toString()+'/capture');
  }
}

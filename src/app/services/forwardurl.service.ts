import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, Observable, BehaviorSubject, map, switchMap, catchError, of, finalize } from "rxjs";
import { AuthclientService  } from "./clients/authclient.service";
import { User, UserModel } from "../models/UserModel";
import { HSessions } from "../common/common-constants";
import { SessionService } from "./core/session.service";
import { ForwardurlclientService } from "./clients/forwardurlclient.service";
import { HCResponse, PaginationModel, StatusModel } from "../models/shared/PaginationModel";
import { AddForwardUrl, AvailableUrl, FreeUrlCount, GetUrlTrackParamModel, UpdateForwardURL, UrlTrackParamListAddModel, urlForwarder, urlForwarders,URLPayModel, urlTrackParamListModel, UpdateForwardURLSubscriptionModel } from "../models/UrlForwarder";

@Injectable({
    providedIn: 'root',
})
export class URlForwardService implements OnDestroy {
    // private fields
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

    // // public fields
    // currentUser$: Observable<UserModel>;
    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;


    constructor(
        private forwardClient: ForwardurlclientService,
        private router: Router,
        private session: SessionService,
    ) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
        
    }

    getForwardUrlsList(model:PaginationModel):Observable<HCResponse>
    {
        return this.forwardClient.getForwardUrls(model);
    }

    getFreeForwardUrlsCount():Observable<FreeUrlCount>
    {
        return this.forwardClient.getFreeForwardUrlsCount();
    }

    getIsAvailableUrl(model:AvailableUrl):Observable<StatusModel>
    {
        return this.forwardClient.getIsAvailableUrl(model);
    }

    addForwardUrl(model:AddForwardUrl):Observable<HCResponse>
    {
        return this.forwardClient.addForwardUrl(model);
    }


    updateForwardUrl(model:UpdateForwardURL):Observable<HCResponse>
    {
        return this.forwardClient.updateForwardUrl(model);
    }
    addTrackParam(model:UrlTrackParamListAddModel):Observable<HCResponse>
    {
        return this.forwardClient.addTrackParam(model);
    }
    updateTrackParam(model:UrlTrackParamListAddModel):Observable<HCResponse>
    {
        return this.forwardClient.updateTrackParam(model);
    }
    getTrackParam(model:GetUrlTrackParamModel):Promise<HCResponse>
    {
        return this.forwardClient.getTrackParam(model);
    }

    purchasePlan(model:URLPayModel)
    {
        return this.forwardClient.purchasePlan(model);
    }
    subscribePlan(model:UpdateForwardURLSubscriptionModel)
    {
        return this.forwardClient.subscribePlan(model);
    }

    unsubscribePlan(urlForwarderId: number)
    {
        return this.forwardClient.unsubscribePlan(urlForwarderId);
    }
    orderPlan()
    {
        return this.forwardClient.orderPlan();
    }
    captureOrderPlan(model:UpdateForwardURLSubscriptionModel)
    {
        return this.forwardClient.captureOrderPlan(model);
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}

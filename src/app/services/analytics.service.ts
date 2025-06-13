import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, Observable, BehaviorSubject, map, switchMap, catchError, of, finalize } from "rxjs";
import { AuthclientService  } from "./clients/authclient.service";
import { User, UserModel } from "../models/UserModel";
import { HSessions } from "../common/common-constants";
import { SessionService } from "./core/session.service";
import { ForwardurlclientService } from "./clients/forwardurlclient.service";
import { HCResponse, HitsLogRequestModel, PaginationModel, StatusModel } from "../models/shared/PaginationModel";
import { AddForwardUrl, AvailableUrl, FreeUrlCount, GetUrlTrackParamModel, UpdateForwardURL, UrlTrackParamListAddModel, urlForwarder, urlForwarders,URLPayModel, urlTrackParamListModel, UpdateForwardURLSubscriptionModel } from "../models/UrlForwarder";
import { AnalyticsClientService } from "./clients/analyticsclient.service";
import { HitLogListing, OwnerStatsModel } from "../models/analyticsModel";

@Injectable({
    providedIn: 'root',
})
export class AnalyticsService implements OnDestroy {
    // private fields
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;


    constructor(
        private analyticsClient: AnalyticsClientService,
    ) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
        
    }

    getOwnerStats():Observable<HCResponse>
    {
        return this.analyticsClient.getOwnerStats();
    }
    
    getHitsListingByURL(filter: HitsLogRequestModel ): Observable<HCResponse>
    {
        return this.analyticsClient.getHitsStatsByUrl(filter);
    }



    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}

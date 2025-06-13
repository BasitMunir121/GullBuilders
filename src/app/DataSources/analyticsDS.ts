import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { urlForwarder, urlForwarders } from "../models/UrlForwarder";
import { BehaviorSubject, Observable, catchError, finalize, of } from "rxjs";
import { OwnerHitsModel, OwnerStatsModel, URLForwarderHitsModel } from "../models/analyticsModel";
import { AnalyticsService } from "../services/analytics.service";
import { HCResposeDto } from "../models/shared/PaginationModel";
import { CommonMethods } from "../common/common-methods";

export class AnalyticsDS implements DataSource<URLForwarderHitsModel> {
    private ownerStatsSubject= new BehaviorSubject<OwnerHitsModel>(new OwnerHitsModel());
    private urlsSubject = new BehaviorSubject<URLForwarderHitsModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public totalRecords: number;
    constructor(private urlService: AnalyticsService) {}

    connect(collectionViewer: CollectionViewer): Observable<URLForwarderHitsModel[]> {
       return this.urlsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.urlsSubject.complete();
        this.loadingSubject.complete();
        //related to OWNER single record..
        this.ownerStatsSubject.complete();
    }
  
    loadOwnerstats() {
     this.loadingSubject.next(true);
     // OwnerStatsModel
     this.urlService.getOwnerStats().pipe(
        catchError(() => of(new HCResposeDto())),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(response => {
        if (response.ResParam.QueryNames.length > 0) {
            //var b=CommonMethods.getResultSetForQueryName<OwnerHitsModel>("GetOwnerHitsFromURLForwarder", response);
            this.urlsSubject.next(CommonMethods.getResultSetForQueryName<URLForwarderHitsModel[]>("GetOwnerHitsFromURLForwarder", response));
            //this.ownerStatsSubject.next(b);
            this.totalRecords = response.ResultSets[0].length?? 0;
          } else {
            this.urlsSubject.next([]);
            this.totalRecords = 0;
          }


        // this.urlsSubject.next(urls.UrlLogs);
        // // this.ownerStatsSubject.next(urls.OwnerLogs)
        // this.totalRecords=urls.UrlLogs?.length ?? 0;
    })
    }  

    // getOwnerHitsToday()
    // {
    //     return this.ownerStatsSubject.value.TotalHitsToday ;

    // }

    // getOwnerHitsThisWeek()
    // {
    //     return this.ownerStatsSubject.value.TotalHitsThisWeek  ;
    // }
    // getOwnerHitsThisMonth()
    // {
    //     return this.ownerStatsSubject.value.TotalHitsThisMonth ;

    // }


    getUrlsForGraph(): Observable<URLForwarderHitsModel[]>
    {
       return this.urlsSubject.asObservable();
    }
}
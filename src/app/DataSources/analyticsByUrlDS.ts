import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, catchError, finalize, of } from "rxjs";
import { HitLogListing, HitLogModel } from "../models/analyticsModel";
import { AnalyticsService } from "../services/analytics.service";
import { CommonMethods } from "../common/common-methods";
import { HCResposeDto } from "../models/shared/PaginationModel";

export class AnalyticsByUrlDS implements DataSource<HitLogModel> {
    private urlsSubject = new BehaviorSubject<HitLogModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public totalRecords: number;
    constructor(private urlService: AnalyticsService) { }

    connect(collectionViewer: CollectionViewer): Observable<HitLogModel[]> {
        return this.urlsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.urlsSubject.complete();
        this.loadingSubject.complete();
    }

    loadURLstats(urlId: number, pageIndex: number, pageSize:number) {
        this.loadingSubject.next(true);
        if(pageIndex==0)
        {
           pageIndex=1;
        }
        this.loadingSubject.next(true);

        this.urlService.getHitsListingByURL({urlForwarderId:urlId,CurrentPage: pageIndex, PageSize:pageSize}).pipe(
            catchError(() => of(new HCResposeDto())),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(response => {
                var hitsData=CommonMethods.getResultSetForQueryName<HitLogModel[]>("GetHitLogsByURLForwarderID", response);
                hitsData = hitsData?.sort((log1, log2) => new Date(log2.HitTime).getTime() - new Date(log1.HitTime).getTime());
                this.urlsSubject.next(hitsData);
                this.totalRecords = response.ResultSets[0].length?? 0;
                // this.urlsSubject.next(urls.hitLogs);
                // this.totalRecords = urls.TotalRecords ?? 0;
            })
    }

    getUrlsForGraph(): Observable<HitLogModel[]> {
        return this.urlsSubject.asObservable();
    }
}
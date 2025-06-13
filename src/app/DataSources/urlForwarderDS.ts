import { CommonMethods } from './../common/common-methods';

import { HCResponse, HCResposeDto } from 'src/app/models/shared/PaginationModel';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { urlForwarder, urlForwarders } from "../models/UrlForwarder";
import { URlForwardService } from "../services/forwardurl.service";
import { BehaviorSubject, Observable, catchError, finalize, of } from "rxjs";

export class ForwardUrlsDataSource implements DataSource<urlForwarder> {

   
    private urlsSubject = new BehaviorSubject<urlForwarder[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public totalRecords: number;

    constructor(private urlService: URlForwardService) {}

    connect(collectionViewer: CollectionViewer): Observable<urlForwarder[]> {
       return this.urlsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.urlsSubject.complete();
        this.loadingSubject.complete();
    }
  
    loadforwardUrls( pageIndex: number, pageSize: number,filter?: string) {
     this.loadingSubject.next(true);
     if(filter== null)
     {
        filter="";
     }
     if(pageIndex==0)
     {
        pageIndex=1;
     }
     this.urlService.getForwardUrlsList({CurrentPage: pageIndex, PageSize:pageSize, Search:filter}).pipe(
        catchError(() => of(new HCResposeDto())),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(response => {
        if (response.ResParam.QueryNames.length > 0) {
            this.urlsSubject.next(CommonMethods.getResultSetForQueryName<urlForwarder[]>("DirectURLs", response));
            this.totalRecords = response.ResultSets[0].length?? 0;
          } else {
            this.urlsSubject.next([]);
            this.totalRecords = 0;
          }
    })
    }  
}
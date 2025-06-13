import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, catchError, finalize, of } from "rxjs";
import { OrganizationService } from "../services/organization.service";
import { urlForwarder, urlForwarders } from "../models/UrlForwarder";
import { HCResposeDto } from "../models/shared/PaginationModel";
import { CommonMethods } from "../common/common-methods";

export class OrganizationURLDataSource implements DataSource<urlForwarder> {

   
    private orgSubject = new BehaviorSubject<urlForwarder[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public totalRecords: number;
data: any;

    constructor(private organizationService: OrganizationService) {

    }

    connect(collectionViewer: CollectionViewer): Observable<urlForwarder[]> {
       return this.orgSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.orgSubject.complete();
        this.loadingSubject.complete();
    }
  
    loadForwardUrls(orgId:number, pageIndex: number, pageSize: number,filter?: string) {
     this.loadingSubject.next(true);
     if(filter== null)
     {
        filter="";
     }
     if(pageIndex==0)
     {
        pageIndex=1;
     }
     this.organizationService.getOrganizationUrls({CurrentPage: pageIndex, PageSize:pageSize, Search:filter},orgId).pipe(
        catchError(() => of(new HCResposeDto())),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(response => {
        if (response.ResParam.QueryNames.length > 0) {
            this.orgSubject.next(CommonMethods.getResultSetForQueryName<urlForwarder[]>("DirectURLs", response));
            this.totalRecords = response.ResultSets[0].length?? 0;
          } else {
            this.orgSubject.next([]);
            this.totalRecords = 0;
          }
        // this.orgSubject.next(urls.urls);
        // this.totalRecords=urls.totalRecords ?? 0;
    })
    }  
}
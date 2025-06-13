import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, catchError, finalize, of } from "rxjs";
import { ListOrganizationModel, OrganizationModel } from "../models/organizationModel";
import { OrganizationService } from "../services/organization.service";
import { CommonMethods } from "../common/common-methods";
import { HCResposeDto } from "../models/shared/PaginationModel";

export class OrganizationDataSource implements DataSource<OrganizationModel> {

   
    private orgSubject = new BehaviorSubject<OrganizationModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public totalRecords: number;

    constructor(private organizationService: OrganizationService) {

    }

    connect(collectionViewer: CollectionViewer): Observable<OrganizationModel[]> {
       return this.orgSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.orgSubject.complete();
        this.loadingSubject.complete();
    }
  
    loadOrganizations( pageIndex: number, pageSize: number,filter?: string) {
     this.loadingSubject.next(true);
     if(filter== null)
     {
        filter="";
     }
     if(pageIndex==0)
     {
        pageIndex=1;
     }
     this.organizationService.getOrganizationsList({CurrentPage: pageIndex, PageSize:pageSize, Search:filter}).pipe(
        catchError(() => of(new HCResposeDto())),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(urls => {
        this.orgSubject.next(CommonMethods.getResultSetForQueryName<OrganizationModel[]>("Organizations", urls));
        this.totalRecords = urls.ResultSets[0].length?? 0;
        //this.totalRecords=urls.TotalRecords ?? 0;
    })
    }  
}
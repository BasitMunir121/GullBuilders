import { Injectable, OnDestroy } from '@angular/core';
import { OrganizationClientService } from './clients/organizationclient.service';
import { Router } from '@angular/router';
import { SessionService } from './core/session.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HCResponse, PaginationModel } from '../models/shared/PaginationModel';
import { AddBrandedOrganizationModel, AddOrganizationModel, AddOrganizationUrlModel, ListOrganizationModel, OrganizationModel, OrganizationPlanUpdateModel } from '../models/organizationModel';
import { GConstants } from '../common/common-constants';
import { NavItem } from '../layouts/full/vertical/sidebar/nav-item/nav-item';
import { CommonMethods } from '../common/common-methods';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // // public fields
  // currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  newOrganizationSubject: BehaviorSubject<NavItem>;

  constructor(
      private organizationsClient: OrganizationClientService,
      private router: Router,
      private session: SessionService,
  ) {
      this.isLoadingSubject = new BehaviorSubject<boolean>(false);
      this.isLoading$ = this.isLoadingSubject.asObservable();
      this.newOrganizationSubject= new BehaviorSubject<NavItem>({});
      
  }

  getOrganizationsList(model:PaginationModel):Observable<HCResponse>
  {
      return this.organizationsClient.getOrganizations(model);
  }

  getOrganizationUrls(model:PaginationModel, orgId:number)
  {
    return this.organizationsClient.getOrganizationUrls(model,orgId);
  }

  getOrganizationDetail(organizationId:number){
    return this.organizationsClient.getOrganizationDetail(organizationId);
  }
  getOrganizationStats(organizationId:number){
    return this.organizationsClient.getOrganizationStats(organizationId);
  }
  getIsPromoAllowed(){
    return this.organizationsClient.getIsPromoAllowed();
  }
  getValidatePromo(promoCode: string):Observable<HCResponse>{
    return this.organizationsClient.getValidatePromo(promoCode);
  }
  addForwardUrl(model:AddOrganizationUrlModel){
    return this.organizationsClient.addOrganizationUrls(model);
  }

  addOrganization(model:AddOrganizationModel){
    return this.organizationsClient.addOrganization(model);
  }
  addBrandedOrganization(model:AddBrandedOrganizationModel){
    return this.organizationsClient.addBrandedOrganization(model);
  }
  updateOrganizationPlan(model:OrganizationPlanUpdateModel){
    return this.organizationsClient.updateOrganizationPlan(model);
  }

  async UpdateNavItems(orgName: string)
  {
    this.getOrganizationsList({ PageSize: GConstants.MaxPageSize, CurrentPage: 1, Search: '' }).subscribe((orgs) => {
       const organizationList = CommonMethods.getResultSetForQueryName<OrganizationModel[]>("Organizations",orgs);
       const matchingOrganization = organizationList?.find((x) => x.OrganizationPrefix === orgName);
       const matchingBrandedOrganization = organizationList?.find((x) => x.OrganizationSubDomain === orgName);
       if (matchingOrganization) {
         // Construct the NavItem
         const navItem: NavItem = {
           displayName: `3u.gg/${matchingOrganization.OrganizationPrefix}`,
           iconName: 'affiliate',
           bgcolor: 'primary',
           route: `/organization/${matchingOrganization.OrganizationID}`,
         };
         this.newOrganizationSubject.next(navItem);
        }
        if (matchingBrandedOrganization) {
          // Construct the NavItem
          const navItem: NavItem = {
            displayName: `${matchingBrandedOrganization.OrganizationSubDomain}.3u.gg`,
            iconName: 'affiliate',
            bgcolor: 'primary',
            route: `/organization/${matchingBrandedOrganization.OrganizationID}`,
          };
          this.newOrganizationSubject.next(navItem);
         }
    });
  }
  
  ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

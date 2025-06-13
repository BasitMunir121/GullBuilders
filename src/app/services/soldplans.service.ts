import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SoldPlanClientService } from './clients/soldplanclient.service';
import { Router } from '@angular/router';
import { AddSoldPlanModel } from '../models/PlanModel';
import { StatusModel } from '../models/shared/PaginationModel';

@Injectable({
  providedIn: 'root'
})
export class SoldplansService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // // public fields
  // currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;


  constructor(
      private forwardClient: SoldPlanClientService,
      private router: Router,
  ) {
      this.isLoadingSubject = new BehaviorSubject<boolean>(false);
      this.isLoading$ = this.isLoadingSubject.asObservable();
      
  }

  addSoldPlan(model:AddSoldPlanModel):Observable<StatusModel>
  {
      return this.forwardClient.addSoldPlan(model);
  }
 
  ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

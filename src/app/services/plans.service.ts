import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PlansClientService } from './clients/plansclient.service';
import { Router } from '@angular/router';
import { SessionService } from './core/session.service';
import { ListPlanModel } from '../models/PlanModel';
import { HCResponse, PaginationModel } from '../models/shared/PaginationModel';

@Injectable({
  providedIn: 'root'
})
export class PlansService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // // public fields
  // currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;


  constructor(
      private plansClient: PlansClientService,
      private router: Router,
  ) {
      this.isLoadingSubject = new BehaviorSubject<boolean>(false);
      this.isLoading$ = this.isLoadingSubject.asObservable();
      
  }

  getPlansList():Observable<HCResponse>
  {
      return this.plansClient.getPlans();
  }

  ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
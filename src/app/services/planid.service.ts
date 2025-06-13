import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanidService {
  private planIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public planId$: Observable<string> = this.planIdSubject.asObservable();

  constructor() {}

  setPlanId(planId: string): void {
    this.planIdSubject.next(planId);
  }
}

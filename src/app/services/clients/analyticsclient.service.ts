import { Injectable } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HitLogListing, OwnerStatsModel } from 'src/app/models/analyticsModel';
import { urlForwarder } from 'src/app/models/UrlForwarder';
import { HCResponse, HitsLogRequestModel, PaginationModel } from 'src/app/models/shared/PaginationModel';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsClientService extends DataService<any> {

  constructor(http: HttpClient) {
    super("analytics", http);
  }

  getOwnerStats(): Observable<HCResponse> {
    return this.get(null,'ownerstats');
  }

  getHitsStatsByUrl(filter:HitsLogRequestModel): Observable<HCResponse>
  {
    return this.get(filter,'hitstatsbyurlforwarderid');
  }
}

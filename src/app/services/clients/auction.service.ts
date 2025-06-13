import { Injectable } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureTokenInputModel, TokenOuputModel } from 'src/app/models/AuthModel';
import { AuthResponseDto, User } from 'src/app/models/UserModel';
import { ConfigurationService } from 'src/app/common/config.service';
import{Auctions, EducationalContent, ListEducationalContent, NotificationModel, Products} from 'src/app/models/analyticsModel';

@Injectable({
  providedIn: 'root'
})
export class AuctionService extends DataService<any> {

  constructor(http: HttpClient) {
    super("auctions", http);
  }

  
  getAllAuctions(): Observable<Auctions[]> {
    return this.get(null,'');
}

getAuction(id:number): Observable<Auctions> {
  return this.get("",id.toString());
}
addAuction(model: Auctions): Observable<Auctions> {
     return this.post(model);
 }

 updateAuction(model: Auctions): Observable<Auctions> {
  return this.put(model,model.id.toString());
}

deleteAuction(id: number): Observable<Auctions> {
    return this.delete(id);
}

}

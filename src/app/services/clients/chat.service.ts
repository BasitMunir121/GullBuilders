import { Injectable } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureTokenInputModel, TokenOuputModel } from 'src/app/models/AuthModel';
import { AuthResponseDto, User } from 'src/app/models/UserModel';
import { ConfigurationService } from 'src/app/common/config.service';
import{BidModel, ChatModel, EducationalContent, ListEducationalContent} from 'src/app/models/analyticsModel';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends DataService<any> {

  constructor(http: HttpClient) {
    super("chat-messages", http);
  }

  
  getchat(auction_id:number): Observable<ChatModel[]> {
    return this.get(null,'auction/'+auction_id);
}


sendMessage(model: ChatModel): Observable<ChatModel> {
     return this.post(model);
 }
 getBids(auction_id:number): Observable<BidModel[]> {
  return this.get(null,'~bids/auction/'+auction_id);
 }
 completeBids(auction_id:number): Observable<BidModel[]> {
  return this.put({},'~auctions/complete/'+auction_id);
 }
}

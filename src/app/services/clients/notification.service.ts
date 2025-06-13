import { Injectable } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureTokenInputModel, TokenOuputModel } from 'src/app/models/AuthModel';
import { AuthResponseDto, User } from 'src/app/models/UserModel';
import { ConfigurationService } from 'src/app/common/config.service';
import{EducationalContent, ListEducationalContent, NotificationModel} from 'src/app/models/analyticsModel';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends DataService<any> {

  constructor(http: HttpClient) {
    super("user-notifications", http);
  }

  
  getAllNotification(): Observable<NotificationModel[]> {
    return this.get(null,'');
}


addNotification(model: NotificationModel): Observable<NotificationModel> {
     return this.post(model);
 }

 updateNotification(model: NotificationModel): Observable<NotificationModel> {
  return this.put(model,model.id.toString());
}

deleteNotification(id: number): Observable<NotificationModel> {
    return this.delete(id);
}

}

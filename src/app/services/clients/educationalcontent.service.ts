import { Injectable } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureTokenInputModel, TokenOuputModel } from 'src/app/models/AuthModel';
import { AuthResponseDto, User } from 'src/app/models/UserModel';
import { ConfigurationService } from 'src/app/common/config.service';
import{EducationalContent, ListEducationalContent} from 'src/app/models/analyticsModel';

@Injectable({
  providedIn: 'root'
})
export class EducantionalContentService extends DataService<any> {

  constructor(http: HttpClient) {
    super("educational-content", http);
  }

  
  getAllEducationalcontent(): Observable<EducationalContent[]> {
    return this.get(null,'');
}


addEducationalcontent(model: EducationalContent): Observable<EducationalContent> {
     return this.post(model);
 }

 updateEducationalcontent(model: EducationalContent): Observable<EducationalContent> {
  return this.put(model,model.id.toString());
}

deleteEducationalcontent(id: number): Observable<EducationalContent> {
    return this.delete(id);
}

}

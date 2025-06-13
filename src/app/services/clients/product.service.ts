import { Injectable } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureTokenInputModel, TokenOuputModel } from 'src/app/models/AuthModel';
import { AuthResponseDto, User } from 'src/app/models/UserModel';
import { ConfigurationService } from 'src/app/common/config.service';
import{EducationalContent, ListEducationalContent, NotificationModel, Products} from 'src/app/models/analyticsModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataService<any> {

  constructor(http: HttpClient) {
    super("products", http);
  }

  
  getAllProduct(farmer_id:number): Observable<Products[]> {
    return this.get(null,'?farmer_id='+farmer_id);
}

getProduct(id:number): Observable<Products> {
  return this.get("",id.toString());
}
addProduct(model: Products): Observable<Products> {
     return this.post(model);
 }

 updateProduct(model: Products): Observable<Products> {
  return this.put(model,model.id.toString());
}

deleteProduct(id: number): Observable<Products> {
    return this.delete(id);
}

}

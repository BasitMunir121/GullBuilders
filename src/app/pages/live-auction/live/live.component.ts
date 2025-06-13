import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Products } from 'src/app/models/analyticsModel';
import { AuthService } from 'src/app/services/authservice';
import { AuctionService } from 'src/app/services/clients/auction.service';
import { ChatService } from 'src/app/services/clients/chat.service';
import { ProductService } from 'src/app/services/clients/product.service';

@Component({
  selector: 'app-live',
  standalone: true,
   imports: [
      MaterialModule,
      CommonModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatIconModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      TablerIconsModule,
      ReactiveFormsModule
    ],
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
})
export class LiveComponent {
  product:Products;
  // product = {
  //   id: 1,
  //   name: 'Apple',
  //   description: 'Fresh Apples from the farm',
  //   farmer_id: 101,
  //   base_price: 15.0,
  //   quantity: 100,
  //   status: 'available',
  // };
  chatMessages :any[]=[];
  biddingPricesData:any[]=[];
  productId: number;
  chatForm: FormGroup;
  bidForm: FormGroup;
  userDetails:any;
  auctionId:number;
  private chatFetchInterval: any; 
  constructor( private auctionService: AuctionService,  private productService: ProductService,private route: ActivatedRoute,private chatService: ChatService,private authService: AuthService,private fb: FormBuilder) {
    this.chatForm = this.fb.group({
      message: ['', [Validators.required]],
    });
    this.bidForm = this.fb.group({
      price: ['', [Validators.required]],
    });
  }

  fetchMessagesData() {
    this.chatService.getchat(this.auctionId).subscribe(resp =>{
      this.chatMessages=resp;
      console.log(resp)
    });
    this.chatService.getBids(this.auctionId).subscribe(resp =>{
      this.biddingPricesData=resp;
      console.log(resp)
    });
  }
  ngOnInit(): void {

    this.userDetails=this.authService.currentUserValue;
    this.auctionId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchMessagesData();
    this.chatFetchInterval = setInterval(() => {
      this.fetchMessagesData();
    }, 5000);
    this.auctionService.getAuction(this.auctionId).subscribe(resp =>{
      this.productId=resp.product_id;
      this.productService.getProduct(this.productId).subscribe(resp =>{
        console.log(resp);
        this.product=resp;
      });
    });
    
  }
  sendMessage() {
    const message = this.chatForm.get('message')?.value;
    if (message.trim()) {
      debugger
      this.chatService.sendMessage({ auction_id: this.auctionId,user_id:this.userDetails.id,message:message}).subscribe(resp =>{
        console.log(resp);
        this.chatMessages.push({ user_id: this.userDetails.id, message: message });
        this.chatForm.reset();
      });
    
    }
  }
  completeBid(){
    this.chatService.completeBids(this.auctionId).subscribe(resp =>{
      console.log(resp);
      alert("Completed successfully");
    });
  }
}

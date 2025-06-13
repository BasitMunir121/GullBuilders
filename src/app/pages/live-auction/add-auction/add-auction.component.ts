
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { AuctionService } from 'src/app/services/clients/auction.service';
import { Auctions } from 'src/app/models/analyticsModel';
import { ProductService } from 'src/app/services/clients/product.service';
import { AuthService } from 'src/app/services/authservice';

@Component({
  selector: 'app-add-auction',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    NgIf,
    MatNativeDateModule,
  ],
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.scss'],
})
export class AddAuctionComponent implements OnInit {
  auctionForm: FormGroup;
  @Input() adversery_Id: number;
  public currentUser:any;
  products:any[];
  userDetails:any;

  constructor(
    private authService: AuthService,
     private productService: ProductService,
    private auctionService: AuctionService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAuctionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentUser = authService.currentUserValue;
    this.auctionForm = this.fb.group({
      product_id: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      starting_price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      status: ['active', Validators.required],
    });
  }


  ngOnInit(): void {
    this.userDetails=this.authService.currentUserValue;
    this.productService.getAllProduct(this.currentUser.id).subscribe(resp =>{
      console.log(resp);
      this.products=resp;
   
    });
    if (this.data) {
      this.auctionForm.patchValue(this.data);
    }
  }


    submit(): void {
      if (this.auctionForm.valid) {
        let formValues = this.auctionForm.value as Auctions; 
        if(this.adversery_Id && this.adversery_Id > 0){
          formValues.id = this.adversery_Id
          this.auctionService.updateAuction(formValues).subscribe( resp => {
            this.dialogRef.close(resp);
    
          }, errorResp => {
          });
        }else{
          console.log('submit',this.currentUser.id)
          // formValues.farmer_id = this.currentUser.id
          this.auctionService.addAuction(formValues).subscribe( resp => {
            this.dialogRef.close(resp);
    
          }, errorResp => {
          });
        }  
                     
        this.dialogRef.close(this.auctionForm.value);
      }
    }
  // submit(): void {
  //   if (this.auctionForm.valid) {
  //     this.dialogRef.close(this.auctionForm.value);
  //   }
  // }

  close(): void {
    this.dialogRef.close();
  }
}

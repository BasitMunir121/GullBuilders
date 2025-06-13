import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Input } from '@angular/core';
import { AuthService } from 'src/app/services/authservice';
import { ProductService } from 'src/app/services/clients/product.service';
import { Products } from 'src/app/models/analyticsModel';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgIf,
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  @Input() adversery_Id: number
  public currentUser:any;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductComponent>,
    private authService: AuthService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentUser = authService.currentUserValue;
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      farmer_id: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      base_price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      status: ['available', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.productForm.patchValue(this.data);
    }
  }

  submit(): void {
    if (this.productForm.valid) {
      let formValues = this.productForm.value as Products; 
      if(this.adversery_Id && this.adversery_Id > 0){
        formValues.id = this.adversery_Id
        this.productService.updateProduct(formValues).subscribe( resp => {
          this.dialogRef.close(resp);
  
        }, errorResp => {
        });
      }else{
        console.log('submit',this.currentUser.id)
        formValues.farmer_id = this.currentUser.id
        this.productService.addProduct(formValues).subscribe( resp => {
          this.dialogRef.close(resp);
  
        }, errorResp => {
        });
      }  
                   
      this.dialogRef.close(this.productForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

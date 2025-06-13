import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthService } from 'src/app/services/authservice';
import { ProductService } from 'src/app/services/clients/product.service';
import { Products } from 'src/app/models/analyticsModel';

@Component({
  selector: 'app-products',
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
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public currentUser:any;
  displayedColumns: string[] = [ 'name', 'description', 'base_price', 'quantity', 'status'];
  dataSource: any[] = [];
  totalRecords = 0;
  loading = false;
  userDetails:any;
  constructor(private authService: AuthService,private dialog: MatDialog, private changeDetection: ChangeDetectorRef,
    private productService: ProductService
  ) {
    this.currentUser = authService.currentUserValue
  }

  // Mock data for demonstration purposes
  productsData:Products[]=[];

  ngOnInit(): void {
    this.fetchTableData();
    this.userDetails=this.authService.currentUserValue;
    if(this.userDetails.IsFarmer){
      this.displayedColumns = [ 'name', 'description', 'base_price', 'quantity', 'status', 'action'];
    }
  }

  fetchTableData() {
    this.loading = true;
    console.log('getAllProduct', this.currentUser.id)
    this.productService.getAllProduct(this.currentUser.id).subscribe(resp =>{
      console.log(resp)
      this.dataSource = resp
      if(resp)
        this.totalRecords = resp.length
    })
  }

  AddProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '680px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // Refresh data or perform additional actions if needed
          this.fetchTableData(); 
        }
      },
    });
  }

  EditProduct(data: any) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: data,
      width: '680px',
    });
    dialogRef.componentInstance.adversery_Id = data.id;
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // Refresh data or perform additional actions if needed
          this.fetchTableData(); 
        }
      },
    });
  }

  DeleteProduct(data: any) {
    const confirmation = confirm("Are you sure you want to delete this product?");
    if (confirmation) {
      console.log(data)
      this.productService.deleteProduct(data.id).subscribe(resp => {
        
      }, errorResp => {
      });
      // const index = this.educationalContentData.findIndex(item => item.id === data.id);
      // if (index !== -1) {
      //   this.educationalContentData.splice(index, 1); // Remove the content from the list
         this.fetchTableData(); // Refresh table data
      // }
    }
  }
}

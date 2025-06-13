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
import { AddAuctionComponent } from './add-auction/add-auction.component';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/authservice';
import { AuctionService } from 'src/app/services/clients/auction.service';
import { Auctions } from 'src/app/models/analyticsModel';

@Component({
  selector: 'app-live-auction',
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
    RouterModule,
  ],
  templateUrl: './live-auction.component.html',
  styleUrls: ['./live-auction.component.scss'],
})
export class LiveAuctionComponent implements OnInit {
  displayedColumns: string[] = [
    'product_id',
    'start_time',
    'end_time',
    'starting_price',
    'status',
    'action',
  ];
  dataSource: any[] = [];
  totalRecords = 0;
  loading = false;
  userDetails:any;
  auctionsData:Auctions[]=[];
  constructor(private auctionService: AuctionService,private authService: AuthService,private dialog: MatDialog, private changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchTableData();
    this.userDetails=this.authService.currentUserValue;
  }

  fetchTableData() {
    this.loading = true;
    // console.log('getAllProduct', this.currentUser.id)
    this.auctionService.getAllAuctions().subscribe(resp =>{
      console.log(resp)
      this.dataSource = resp
      if(resp)
        this.totalRecords = resp.length
    })
  }
  // fetchTableData(): void {
  //   this.loading = true;
  //   setTimeout(() => {
  //     this.dataSource = this.auctionsData;
  //     this.totalRecords = this.auctionsData.length;
  //     this.loading = false;
  //   }, 1000);
  // }

  AddAuction() {
    const dialogRef = this.dialog.open(AddAuctionComponent, {
      width: '680px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchTableData(); 
        }
      },
    });
  }

  EditAuction(data: any) {
    const dialogRef = this.dialog.open(AddAuctionComponent, {
      data: data,
      width: '680px',
    });
    dialogRef.componentInstance.adversery_Id = data.id;
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchTableData(); 
        }
      },
    });
  }

  // DetailAuction(data: any) {
  //   const confirmation = confirm('Are you sure you want to delete?');
  //   if (confirmation) {
  //     console.log('Deletion confirmed:', data);
  //   } else {
  //     console.log('Deletion canceled');
  //   }
  // }
  qrCode(data: any){

  }
}

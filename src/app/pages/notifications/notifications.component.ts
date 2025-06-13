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
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { AuthService } from 'src/app/services/authservice';
import { NotificationService } from 'src/app/services/clients/notification.service';
import { EducationalContent } from 'src/app/models/analyticsModel';

@Component({
  selector: 'app-notifications',
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
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  // displayedColumns: string[] = ['id', 'advisory_id', 'title', 'content', 'action'];
  displayedColumns: string[] = ['advisory_id', 'title', 'content'];
  dataSource: any[] = [];
  userDetails:any;
  totalRecords = 0;
  loading = false;
  constructor(private authService: AuthService,private dialog: MatDialog,
    private changeDetection: ChangeDetectorRef,
  private notificationService: NotificationService) {
  }
  notificationsData:EducationalContent[] = [];

  ngOnInit(): void {
    this.fetchTableData();
    this.userDetails=this.authService.currentUserValue;
    if(this.userDetails.IsGovtAgency){
      this.displayedColumns = ['advisory_id', 'title', 'content', 'action'];
    }
  }

  fetchTableData() {
    this.loading = true;
    this.notificationService.getAllNotification().subscribe(resp =>{
      console.log(resp)
      this.dataSource = resp
      if(resp)
        this.totalRecords = resp.length
    })
  }

  AddNotification() {
    const dialogRef = this.dialog.open(AddNotificationComponent, {
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
  EditNotification(data: any) {
    console.log('EditNotification',data)
    const dialogRef = this.dialog.open(AddNotificationComponent, {
      data:data,
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
  DeleteNotification(data: any) {
    const confirmation = confirm("Are you sure you want to delete this notification?");
    if (confirmation) {
      console.log(data)
      this.notificationService.deleteNotification(data.id).subscribe(resp => {
        
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

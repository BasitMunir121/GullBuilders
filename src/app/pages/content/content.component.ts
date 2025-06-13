// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-content',
//   standalone: true,
//   imports: [],
//   templateUrl: './content.component.html',
//   styleUrl: './content.component.scss'
// })
// export class ContentComponent {

// }
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
import { AddContentComponent } from './add-content/add-content.component';  // Component for adding content
import { EducantionalContentService } from 'src/app/services/clients/educationalcontent.service';
import { ListEducationalContent } from 'src/app/models/analyticsModel';
import { AuthService } from 'src/app/services/authservice';
import { lastValueFrom, map, Observable } from 'rxjs';
@Component({
  selector: 'app-content',
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
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {

  public currentUser:any;
  // Define the columns you want to display
  displayedColumns: string[] = ['advisory_id', 'title', 'content'];
  dataSource: any[]=[];
  totalRecords = 0;
  loading = false;
  userDetails:any;

  constructor(private dialog: MatDialog, private changeDetection: ChangeDetectorRef,
    private educationalContentService: EducantionalContentService,
    private authService: AuthService
  ) {
    this.currentUser = authService.currentUserValue
  }

  // Sample data - you would replace this with an actual API call or database
  educationalContentData: ListEducationalContent = new ListEducationalContent;

  ngOnInit(): void {
    this.fetchTableData();
    this.userDetails=this.authService.currentUserValue;
    if(this.userDetails.IsGovtAgency){
      this.displayedColumns = ['advisory_id', 'title', 'content', 'action'];
    }
  }

  ngAfterViewInit(): void {
    this.fetchTableData()
  }

   fetchTableData() {
    this.loading = true;
    this.educationalContentService.getAllEducationalcontent().subscribe(resp =>{
      console.log(resp)
      this.dataSource = resp
      if(resp)
        this.totalRecords = resp.length
    })
  }

  // Open dialog to add new content
  AddContent() {
    const dialogRef = this.dialog.open(AddContentComponent, {
      width: '680px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // this.educationalContentData.push(val); // Add new content to data source
           this.fetchTableData(); // Refresh table data
        }
      },
    });
  }

  // Edit existing content
  EditContent(data: any) {
    const dialogRef = this.dialog.open(AddContentComponent, {
      data: data,  // Pass existing data to dialog for editing
      width: '680px',
    });
    dialogRef.componentInstance.adversery_Id = data.id;
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // const index = this.educationalContentData.findIndex((item) => item.id === val.id);
          // if (index !== -1) {
          //   this.educationalContentData[index] = val; // Update existing content
             this.fetchTableData(); // Refresh table data
          // }
        }
      },
    });
  }

  // Delete content
  DeleteContent(data: any) {
    const confirmation = confirm("Are you sure you want to delete this content?");
    if (confirmation) {
      this.educationalContentService.deleteEducationalcontent(data.id).subscribe(resp => {
        
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

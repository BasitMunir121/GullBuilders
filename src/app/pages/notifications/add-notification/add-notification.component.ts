
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Input } from '@angular/core';
import { AuthService } from 'src/app/services/authservice';
import { NotificationService } from 'src/app/services/clients/notification.service';
import { EducationalContent, NotificationModel } from 'src/app/models/analyticsModel';
@Component({
  selector: 'app-add-notification',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss'],
})
export class AddNotificationComponent {
  @Input() adversery_Id: number
  notificationForm: FormGroup;
  public currentUser:any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddNotificationComponent>,
    private authService: AuthService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.currentUser = authService.currentUserValue
    if(data)
      {
        this.notificationForm = this.fb.group({
          // advisory_id: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
          title: ['', [Validators.required, Validators.maxLength(255)]],
          content: ['', [Validators.required]],
        });
          
      }
      else{
        this.notificationForm = this.fb.group({
          // advisory_id: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
          title: ['', [Validators.required, Validators.maxLength(255)]],
          content: ['', [Validators.required]],
        });
    }
  }
  ngOnInit(): void {
    this.notificationForm.patchValue(this.data);
  }
  submit(): void {
    if (this.notificationForm.valid) {
      let formValues = this.notificationForm.value as NotificationModel;  
            if(this.adversery_Id && this.adversery_Id > 0){
              formValues.id = this.adversery_Id
              this.notificationService.updateNotification(formValues).subscribe( resp => {
                this.dialogRef.close(resp);
        
              }, errorResp => {
              });
            }else{
              console.log('submit',this.currentUser.id)
              formValues.advisory_id = this.currentUser.id
              this.notificationService.addNotification(formValues).subscribe( resp => {
                this.dialogRef.close(resp);
        
              }, errorResp => {
              });
            }     
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

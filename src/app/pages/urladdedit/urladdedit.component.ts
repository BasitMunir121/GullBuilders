import { DatePipe, NgIf } from '@angular/common';
import { Component, Inject, OnInit, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseForm } from 'src/app/common/base-form';
import { MaterialModule } from 'src/app/material.module';
import { AddForwardUrl, UpdateForwardURL } from 'src/app/models/UrlForwarder';
import { AuthService } from 'src/app/services/authservice';
import { NotifyService } from 'src/app/services/core/toast.service';
import { URlForwardService } from 'src/app/services/forwardurl.service';
import { CrossbuttonComponent } from "../crossbutton/crossbutton.component";
@Component({
  standalone:true,
  selector: 'app-urladdedit',
  templateUrl: './urladdedit.component.html',
  styleUrls: ['./urladdedit.component.scss'],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgIf,
    CrossbuttonComponent
]
})
export class UrladdeditComponent extends BaseForm implements OnInit {
  urlForm: FormGroup;

  constructor(
    private empService: URlForwardService,
    private dialogRef: MatDialogRef<UrladdeditComponent>,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private _notifyService: NotifyService,
    @Inject(MAT_DIALOG_DATA) public data: AddForwardUrl,
  ) {
    super(authService);
    // const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    //const reg = '(https?://)?([\\da-zA-Z.-]+)\\.([a-zA-Z.]{2,6})([/\\w .-]*)*/?';
    const reg  = /https?:\/\/(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/;
    const url='^(([A-Za-z0-9~-])+){5,}';
    if(data)
    {
      this.urlForm = this.formBuilder.group({
        URLPath: ['',[ Validators.required]],
        // TargetURL: ['', [Validators.required,Validators.pattern(reg)]],
        TargetURL: ['https://', [Validators.required, Validators.pattern(reg)]], // Default value is 'https://'
        URLHash:[''],
        URLForwarderID:[Number]
        });
        
    }
    else{
    this.urlForm = this.formBuilder.group({
    URLPath: ['',[ Validators.required,,Validators.pattern(url)]],
    // TargetURL: ['', [Validators.required,Validators.pattern(reg)]],
    TargetURL: ['https://', [Validators.required, Validators.pattern(reg)]], // Default value is 'https://'
    URLHash:[''],
    URLForwarderID:[Number]
    });
  }
  }
  ngOnInit(): void {
    this.data.TargetURL = this.data.TargetURL ? this.data.TargetURL : 'https://';
    this.urlForm.patchValue(this.data);
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
  onSubmit() {
    if(this.urlForm.invalid)
    {
      this.urlForm.markAllAsTouched();
      return;
    }

    if (this.urlForm.valid) {
      if (this.data) {
        var updateForwardUrl= new UpdateForwardURL();
        if(this.urlForm.value.URLForwarderID > 0)
        {
          updateForwardUrl.ForwardUrlId=this.urlForm.value.URLForwarderID;
          updateForwardUrl.TargetURL= this.urlForm.value.TargetURL;
          this.empService
          .updateForwardUrl(updateForwardUrl)
          .subscribe({
            next: (val) => {
              if(val.ResParam.payload != null)
              {
                this._notifyService.showToast(val.ResParam.payload);
                this.urlForm.reset();
                this.dialogRef.close(true);
              }else{
                if(val.ResParam.payload.ErrorDetails)
                {
                  this._notifyService.showToast(val.ResParam.payload.ErrorDetails,true);
                }
                else
                {
                  this._notifyService.showToast("Error while updating the target URL.",true);
                }
              }
            },
            error: (err: any) => {
              if (err.error?.ErrorDetails) {
                this._notifyService.showToast(err.error.ErrorDetails, true);
              } else if (err.status && err.status !== 200) {
                this._notifyService.showToast(err.error, true);
              } else {
                this._notifyService.showToast(err.message, true);
              }
            },
          });
        }
       
      } else {

        console.log(this.urlForm.value);
        this.empService.addForwardUrl(this.urlForm.value).subscribe({
          next: (val) => {
            if(val.ResParam.payload != null)
            {
              this._notifyService.showToast(val.ResParam.payload);
              this.urlForm.reset();
              this.dialogRef.close(true);
            }else{
              if(val.ResParam.payload.ErrorDetails)
                {
                  this._notifyService.showToast(val.ResParam.payload.ErrorDetails,true);
                }
                else
                {
                  this._notifyService.showToast("Error while adding the short URL.",true);
                }
            }
          },
          error: (err: any) => {
            if (err.error?.ErrorDetails) {
              this._notifyService.showToast(err.error.ErrorDetails, true);
            } else if (err.status && err.status !== 200) {
              this._notifyService.showToast(err.error, true);
            } else {
              this._notifyService.showToast(err.message, true);
            }
            //alert("Error while adding the short URL!");
          },
        });
      }
    }
  }

}

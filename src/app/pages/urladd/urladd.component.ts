import { DatePipe, NgIf, NgFor } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Pipe, SimpleChange, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject, Observable, catchError, finalize, of } from 'rxjs';
import { BaseForm } from 'src/app/common/base-form';
import { GConstants } from 'src/app/common/common-constants';
import { MaterialModule } from 'src/app/material.module';
import { ListPlanModel, PlanModel } from 'src/app/models/PlanModel';
import { AddForwardUrl, AvailableUrl, UpdateForwardURL, UrlTrackParamListAddModel, UrlTrackParamAddModel } from 'src/app/models/UrlForwarder';
import { AddOrganizationUrlModel, OrganizationModel } from 'src/app/models/organizationModel';
import { StatusModel,HCResponse } from 'src/app/models/shared/PaginationModel';
import { AuthService } from 'src/app/services/authservice';
import { NotifyService } from 'src/app/services/core/toast.service';
import { URlForwardService } from 'src/app/services/forwardurl.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';
import { CrossbuttonComponent } from "../crossbutton/crossbutton.component";

@Component({
  selector: 'app-urladd',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    TablerIconsModule,
    NgIf,
    CrossbuttonComponent
],
  templateUrl: './urladd.component.html',
  styleUrl: './urladd.component.scss'
})
export class UrladdComponent extends BaseForm implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  isAvailable: boolean | null = null;
  isOpenedOrgURLModal: boolean = false;
  isBranded: boolean = false;
  orgNameForUrl: string | null = null;
  orgIdForUrl: string | null = null;
  urlFId: BehaviorSubject<number>;
  urlForm: FormGroup;
  targetUrlForm: FormGroup;
  public loading$: Observable<boolean>;
  public loadingSubject: BehaviorSubject<boolean>;
  @ViewChild('input') input: ElementRef;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empService: URlForwardService,
    private dialogRef: MatDialogRef<UrladdComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _notifyService: NotifyService,
    private organizationService: OrganizationService,
    // @Inject(MAT_DIALOG_DATA) public data: AddForwardUrl,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    super(authService);
    this.urlFId = new BehaviorSubject<number>(0);
    // const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    //const reg = '(https?://)?([\\da-zA-Z.-]+)\\.([a-zA-Z.]{2,6})([/\\w .-]*)*/?';
    const reg  = /https?:\/\/(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/;

    // const url = '^(([A-Za-z0-9~-])+){4,}';
    // const url = '^[a-zA-Z0-9]{4,}$';
    const url = data && data.isOpenedOrgURLModal ? '^[a-zA-Z0-9/]{1,}$' : '^[a-zA-Z0-9]{4,}$';


    this.urlForm = this.formBuilder.group({
      //PlanId: [Number, Validators.required],
      //OrganizationName: [''],
      //OrganizationID: [''],
      URLPath: ['', [Validators.required, , Validators.pattern(url)]],
      // TargetURL: ['', [Validators.required, Validators.pattern(reg)]],
      //URLHash: [''],
      // URLForwarderID: [Number]
    });
    this.targetUrlForm = this.formBuilder.group({
      //PlanId: [Number, Validators.required],
      // OrganizationName: [''],
      //URLPath: ['', [Validators.required, , Validators.pattern(url)]],
      TargetURL: ['https://', [Validators.required, Validators.pattern(reg)]],
      //URLHash: [''],
      URLForwarderID: [Number, Validators.required]
    });
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading$ = this.loadingSubject.asObservable();
    if (data && data.isOpenedOrgURLModal) {
      this.isOpenedOrgURLModal = true;
      this.orgNameForUrl = data.orgName;
      this.orgIdForUrl = data.orgId;
      this.isBranded=data.isBranded;
    }
  }
  ngOnInit(): void {
    this.loadingSubject.next(true);
    this.setURLPathFromQueryParam();
  }
  private setURLPathFromQueryParam() {
    this.route.queryParams.subscribe(params => {
      const urlParam = params['url'];
      if (urlParam) {
        this.urlForm.patchValue({
          URLPath: urlParam
        });
        this.checkAvailability(urlParam);
      }
    });
  }

  checkAvailability(urlInputValue: string) {
    if (urlInputValue && urlInputValue.length >= 1) {
      
      let modelUrl: AvailableUrl;

      if (this.orgNameForUrl) {
        if(this.isBranded){
          modelUrl = { url: urlInputValue,subdomain: this.orgNameForUrl };
        }else{
          modelUrl = { url: this.orgNameForUrl+"/"+urlInputValue };
        }
      } else {
        modelUrl = { url: urlInputValue };
      }
      this.empService.getIsAvailableUrl(modelUrl)
        .subscribe((status: StatusModel) => {
          const response: HCResponse = status as HCResponse;
          if (response.ResParam.payload.IsSuccess) {
            this.isAvailable = true;
          } else {
            this.isAvailable = false;
          }
        }, (errorResponse) => {
          this.isAvailable = false;
        });
    } else {
      this.isAvailable = false;
    }
  }
  falseAvailability() {
    this.isAvailable = null;
  }

  onSubmit() {
    if (this.urlForm.invalid) {
      this.urlForm.markAllAsTouched();
      return;
    }
    if (this.urlForm.valid) {
      if (this.orgNameForUrl) {
        var urlOrgForDb=this.urlForm.get('URLPath')?.value;
        if(!this.isBranded){
          urlOrgForDb=this.orgNameForUrl+"/"+this.urlForm.get('URLPath')?.value;
        }
        const addOrganizationUrlModel: AddOrganizationUrlModel = {
          // URLPath:this.orgNameForUrl+"/"+this.urlForm.get('URLPath')?.value,
          URLPath:urlOrgForDb,
          OrganizationID:parseInt(this.orgIdForUrl || ""),
        }
        this.organizationService.addForwardUrl(addOrganizationUrlModel).subscribe({
          next: (val) => {
            //const response: HCResponse = val as HCResponse;
            if (val.ResParam.payload.Id) {
              this._notifyService.showToast('Short URL added successfully.');
              this.targetUrlForm.controls['URLForwarderID'].setValue(val.ResParam.payload.Id);
              this.urlFId.next(val.ResParam.payload.Id ?? 0);
              this.stepper.next();
              //this.router.navigateByUrl('../organization/'+this.orgIdForUrl);
            } else {
              if (val.ResParam.payload.Id==null) {
                this._notifyService.showToast(val.ResParam.payload.ErrorDetails, true);
              }
              else {
                this._notifyService.showToast("Error while adding the short URL.", true);
              }
            }
          },
          error: (err: any) => {
            console.error(err);
            if (err.error?.ErrorDetails) {
              this._notifyService.showToast(err.error.ErrorDetails, true);
            } else if (err.status && err.status !== 200) {
              this._notifyService.showToast(err.error, true);
            } else {
              this._notifyService.showToast(err.message, true);
            }
          },
        });
      } else {
        //console.log(this.urlForm.value);
        this.empService.addForwardUrl(this.urlForm.value).subscribe({
          next: (val) => {
            if (val.ResParam.payload.Id) {
              this._notifyService.showToast('Short URL added successfully.');
              this.targetUrlForm.controls['URLForwarderID'].setValue(val.ResParam.payload.Id);
              this.urlFId.next(val.ResParam.payload.Id ?? 0);
              this.stepper.next();
              this.router.navigateByUrl('../forwardurls');
              // this.urlForm.reset();
              // this.dialogRef.close(true);
            } else {
              if (val.ResParam.payload.Id==null) {
                this._notifyService.showToast(val.ResParam.payload.ErrorDetails, true);
              }
              else {
                this._notifyService.showToast("Error while adding the short URL.", true);
              }
            }
          },
          error: (err: any) => {
            console.error(err);
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

    }
  }
  onSubmitUpdate() {
    if (this.targetUrlForm.invalid) {
      this.targetUrlForm.markAllAsTouched();
      return;
    }
    if (this.targetUrlForm.valid) {
      var updateForwardUrl = new UpdateForwardURL();
      if (this.targetUrlForm.value.URLForwarderID > 0) {
        updateForwardUrl.ForwardUrlId = this.targetUrlForm.value.URLForwarderID;
        updateForwardUrl.TargetURL = this.targetUrlForm.value.TargetURL;
        this.empService
          .updateForwardUrl(updateForwardUrl)
          .subscribe({
            next: (val) => {
              if (val.ResParam.payload != null) {

                this._notifyService.showToast(val.ResParam.payload);
                this.stepper.next();
                if(this.orgNameForUrl){
                  //this.router.navigateByUrl('../forwardurls');
                }else{
                  this.router.navigateByUrl('../forwardurls');
                }
                // this.targetUrlForm.reset();
                // this.dialogRef.close(true);
              } else {
                if (val.ResParam.payload.ErrorDetails) {
                  this._notifyService.showToast(val.ResParam.payload.ErrorDetails, true);
                }
                else {
                  this._notifyService.showToast("Error while adding the target URL.", true);
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
    }
  }
  thirdStep() {
    this.stepper.next();
  }
}

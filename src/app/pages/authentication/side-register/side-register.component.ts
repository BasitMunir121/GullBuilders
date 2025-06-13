import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { AuthService } from 'src/app/services/authservice';
import { SessionService } from 'src/app/services/core/session.service';
import { NotifyService } from 'src/app/services/core/toast.service';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router,private authService: AuthService,
        private route: ActivatedRoute,
        private session: SessionService,
      private _notifyService:NotifyService) {}

  form = new FormGroup({
    roleId: new FormControl('', [Validators.required]),
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    this.authService.register(this.form.value.email ?? "", this.form.value.password ?? "", parseInt(this.form.value.roleId ?? "1"))
          .subscribe({
            next: (val) => {
              if (val.email != null) {
                this._notifyService.showToast("you have successfully registered. Please login to continue.", false);
                  this.router.navigateByUrl('/authentication');
              } else {
                if (val.ErrorDetails) {
                  this._notifyService.showToast(val.ErrorDetails, true);
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
    // console.log(this.form.value);
    
  }
}

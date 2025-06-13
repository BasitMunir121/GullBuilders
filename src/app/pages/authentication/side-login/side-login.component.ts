import { Component, Input } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AuthService } from 'src/app/services/authservice';
import { SessionService } from 'src/app/services/core/session.service';
import { User } from 'src/app/models/UserModel';
import { Subscription, first } from 'rxjs';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router,private authService: AuthService,
      private route: ActivatedRoute,
      private session: SessionService) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {

   return  this.authService.loginWithUsername(this.form.value.uname?? "", this.form.value.password ?? "").pipe(first()).subscribe(user => {
      this.handleLoginRequest(user);
    });
  }

private handleLoginRequest(user: User) {
    this.route.queryParams.subscribe(params => {
      this.router.navigate(['/dashboard'], {
        queryParams: { ...params },
        queryParamsHandling: 'merge'
      });
    });
  }

  @Input() error: string | null = '';

}

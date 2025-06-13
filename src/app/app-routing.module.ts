import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AppErrorComponent } from './pages/authentication/error/error.component';
import { AuthGuard, UserGuard } from './common/auth.guard';
import { User } from './models/UserModel';
// import { AuthGuard, UserGuard } from './common/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/landingpage', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: FullComponent,
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'KisanXpert',
    canActivate: [AuthGuard],
    component: FullComponent,

    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'authentication',
    canActivate:[UserGuard],
    loadChildren: () =>
      import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
  },
  {
    path: 'landingpage',
    loadChildren: () =>
      import('./pages/landingpage/landingpage.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'error',
    component: AppErrorComponent,
  },
  {
    path: '**',
    redirectTo: '/error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

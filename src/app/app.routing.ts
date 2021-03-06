import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthGuard} from './auth/auth.guard';
import {NgModule} from '@angular/core';
import {ResetpasswordComponent} from './auth/resetpassword/resetpassword.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';

const AppRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,

  }, {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }],
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  }, {
    path: 'resetPassword/:token',
    component: ResetpasswordComponent

  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent

  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}

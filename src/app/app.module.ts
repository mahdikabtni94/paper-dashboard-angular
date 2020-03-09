import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ToastrModule} from 'ngx-toastr';

import {SidebarModule} from './sidebar/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth-interceptor';
import {CreateUserComponent} from './pages/users/create-user/create-user.component';
import {MatConfirmDialogComponent} from './mat-confirm-dialog/mat-confirm-dialog.component';
import {ResetpasswordComponent} from './auth/resetpassword/resetpassword.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {CustomersComponent} from './customers/customers.component';
import {CustomerModule} from './customers/customer.module';
import {CreateUserModule} from './pages/users/create-user/create-user.module';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    SignupComponent,
    MatConfirmDialogComponent,
    ResetpasswordComponent,
    ForgotPasswordComponent,


  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    CreateUserModule,
    CustomerModule,
    MatInputModule


  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
  ],

  bootstrap: [AppComponent],
  entryComponents: [CustomersComponent, CreateUserComponent, MatConfirmDialogComponent,]
})

export class AppModule {
}

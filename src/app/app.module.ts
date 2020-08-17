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
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
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
import {CreateSiteComponent} from './pages/sites/create-site/create-site.component';
import {CreateLineComponent} from './pages/lines/create-line/create-line.component';
import {CreateProfileComponent} from './pages/profiles/create-profile/create-profile.component';
import {CreateMachineComponent} from './pages/machines/create-machine/create-machine.component';
import {CreateMachineTypeComponent} from './pages/machine_types/create-machine-type/create-machine-type.component';
import {CreateOperatorComponent} from './pages/staff/create-operator/create-operator.component';
import {CreateSupervisorComponent} from './pages/staff/create-supervisor/create-supervisor.component';
import {CreatemechanicComponent} from './pages/staff/create-mechanic/create-mechanic.component';
import {CreateOperationComponent} from './pages/production-management/create-operation/create-operation.component';
import {CreateSequenceComponent} from './pages/production-management/create-sequence/create-sequence.component';
import {CreateArticleComponent} from './pages/production-management/create-article/create-article.component';
import {CreateelectronicComponent} from './pages/staff/create-electronic/create-electronic.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {CreateBoxComponent} from './pages/boxes/create-box/create-box.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    SignupComponent,
    MatConfirmDialogComponent,
    ResetpasswordComponent,
    ForgotPasswordComponent,
    CreateSiteComponent,
    CreateLineComponent,
    CreateProfileComponent,
    CreateMachineComponent,
    CreateMachineTypeComponent,
    CreateOperatorComponent,
    CreateSupervisorComponent,
    CreatemechanicComponent,
    CreateelectronicComponent,
    CreateOperationComponent,
    CreateSequenceComponent,
    CreateArticleComponent,
    CreateBoxComponent,


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
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    NgSelectModule,
    MatStepperModule


  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}},
  ],

  bootstrap: [AppComponent],
  entryComponents: [CustomersComponent,
    CreatemechanicComponent,
    CreateelectronicComponent,
    CreateUserComponent,
    MatConfirmDialogComponent,
    CreateSiteComponent,
    CreateLineComponent,
    CreateProfileComponent,
    CreateMachineComponent,
    CreateMachineTypeComponent,
    CreateSupervisorComponent,
    CreateOperatorComponent,
    CreateSequenceComponent,
    CreateOperationComponent,
    CreateArticleComponent,
    CreateBoxComponent
  ]
})

export class AppModule {
}

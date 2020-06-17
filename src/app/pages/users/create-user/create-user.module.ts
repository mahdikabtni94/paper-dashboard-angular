import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CreateUserComponent} from './create-user.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [RouterModule, CommonModule, MatGridListModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatToolbarModule, FormsModule, ],
  declarations: [ CreateUserComponent ],
  exports: [ CreateUserComponent],

})


export  class CreateUserModule {

}

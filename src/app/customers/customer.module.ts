import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSelectModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomersComponent} from './customers.component';



@NgModule({

  imports: [RouterModule, CommonModule, MatGridListModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule,
    MatIconModule, MatToolbarModule, MatProgressSpinnerModule, FormsModule, MatPaginatorModule, MatTableModule,],
  declarations: [ CustomersComponent ],
  exports: [ CustomersComponent],

})


export  class CustomerModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {UsersListComponent} from './users-list.component';
import {
  MatButtonModule, MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';


@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [RouterModule, CommonModule, MatProgressSpinnerModule, MatIconModule, MatInputModule, FormsModule, MatTableModule, MatSortModule, MatButtonModule, MatPaginatorModule, MatDialogModule],
  declarations: [ UsersListComponent ],
  exports: [ UsersListComponent, MatDialogModule]
})

export class UsersListModule {}

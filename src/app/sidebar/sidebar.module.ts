import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import {MatButtonModule, MatIconModule, MatTreeModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
    imports: [ RouterModule, CommonModule,    BrowserModule,
      BrowserAnimationsModule,
      MatTreeModule,
      MatIconModule,
      MatButtonModule,
    MatToolbarModule],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}

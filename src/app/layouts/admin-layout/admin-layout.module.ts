import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';
// tslint:disable-next-line:import-spacing
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
// tslint:disable-next-line:import-spacing
import {UserComponent} from '../../pages/user/user.component';
// tslint:disable-next-line:import-spacing
import {TypographyComponent} from '../../pages/typography/typography.component';
// tslint:disable-next-line:import-spacing
import {IconsComponent} from '../../pages/icons/icons.component';
// tslint:disable-next-line:import-spacing
import {MapsComponent} from '../../pages/maps/maps.component';
// tslint:disable-next-line:import-spacing
import {NotificationsComponent} from '../../pages/notifications/notifications.component';
// tslint:disable-next-line:import-spacing
import {UpgradeComponent} from '../../pages/upgrade/upgrade.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule, MatSlideToggleModule,
  MatSortModule,
  MatTableModule, MatToolbarModule
} from '@angular/material';

import {UsersComponent} from '../../pages/users/users.component';
import {UsersListComponent} from '../../pages/users/users-list/users-list.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSlideToggleModule

  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UsersComponent,
    UsersListComponent,



  ]

})

export class AdminLayoutModule {
}

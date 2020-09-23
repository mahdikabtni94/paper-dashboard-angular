import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

import {UsersComponent} from '../../pages/users/users.component';
import {UsersListComponent} from '../../pages/users/users-list/users-list.component';
import {SitesComponent} from '../../pages/sites/sites.component';
import {SitesListComponent} from '../../pages/sites/sites-list/sites-list.component';
import {LinesComponent} from '../../pages/lines/lines.component';
import {LinesListComponent} from '../../pages/lines/lines-list/lines-list.component';
import {CustomersListComponent} from '../../customers/customers-list/customers-list.component';
import {ProfilesComponent} from '../../pages/profiles/profiles.component';
import {ProfileListComponent} from '../../pages/profiles/profile-list/profile-list.component';
import {MachinesComponent} from '../../pages/machines/machines.component';
import {MachineListComponent} from '../../pages/machines/machine-list/machine-list.component';
import {MachineTypeListComponent} from '../../pages/machine_types/machine-type-list/machine-type-list.component';
import {StaffComponent} from '../../pages/staff/staff.component';
import {OperatorListComponent} from '../../pages/staff/operator-list/operator-list.component';
import {SupervisorListComponent} from '../../pages/staff/supervisor-list/supervisor-list.component';
import {MechnicsListComponent} from '../../pages/staff/mechnics-list/mechnics-list.component';
import {ElectronicsListComponent} from '../../pages/staff/electronics-list/electronics-list.component';
import {OperationListComponent} from '../../pages/production-management/operation-list/operation-list.component';
import {SequenceListComponent} from '../../pages/production-management/sequence-list/sequence-list.component';
import {ArticleListComponent} from '../../pages/production-management/article-list/article-list.component';
import {ProductionManagementComponent} from '../../pages/production-management/production-management.component';
import {OrderBundleComponent} from '../../pages/order-bundle/order-bundle.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {UpdateOrderComponent} from '../../pages/order-bundle/update-order/update-order.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {BoxListComponent} from '../../pages/boxes/box-list/box-list.component';
import {BoxesComponent} from '../../pages/boxes/boxes.component';
import {BundleListComponent} from '../../pages/order-bundle/bundle-list/bundle-list.component';
import {AlertComponent} from '../../shared/alert/alert.component';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {PipesModule} from '../../shared/pipes.module';


@NgModule({
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
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
    MatSlideToggleModule,
    MatTabsModule,
    MatExpansionModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgSelectModule,
    AutocompleteLibModule,
    PipesModule


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
    SitesComponent,
    SitesListComponent,
    LinesComponent,
    LinesListComponent,
    CustomersListComponent,
    ProfilesComponent,
    ProfileListComponent,
    MachinesComponent,
    MachineListComponent,
    MachineTypeListComponent,
    StaffComponent,
    OperatorListComponent,
    SupervisorListComponent,
    MechnicsListComponent,
    ElectronicsListComponent,
    OperationListComponent,
    SequenceListComponent,
    ArticleListComponent,
    ProductionManagementComponent,
    OrderBundleComponent,
    UpdateOrderComponent,
    BoxListComponent,
    BoxesComponent,
    BundleListComponent,
    AlertComponent,

  ]

})

export class AdminLayoutModule {
}

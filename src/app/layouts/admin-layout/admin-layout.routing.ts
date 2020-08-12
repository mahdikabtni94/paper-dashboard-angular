import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
import {TypographyComponent} from '../../pages/typography/typography.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {NotificationsComponent} from '../../pages/notifications/notifications.component';
import {UpgradeComponent} from '../../pages/upgrade/upgrade.component';
import {UsersComponent} from '../../pages/users/users.component';
import {SitesComponent} from '../../pages/sites/sites.component';
import {LinesComponent} from '../../pages/lines/lines.component';
import {UsersListComponent} from '../../pages/users/users-list/users-list.component';
import {CustomersListComponent} from '../../customers/customers-list/customers-list.component';
import {SitesListComponent} from '../../pages/sites/sites-list/sites-list.component';
import {ProfileListComponent} from '../../pages/profiles/profile-list/profile-list.component';
import {ProfilesComponent} from '../../pages/profiles/profiles.component';
import {LinesListComponent} from '../../pages/lines/lines-list/lines-list.component';
import {MachineListComponent} from '../../pages/machines/machine-list/machine-list.component';
import {MachineTypeListComponent} from '../../pages/machine_types/machine-type-list/machine-type-list.component';
import {OperatorListComponent} from '../../pages/staff/operator-list/operator-list.component';
import {SupervisorListComponent} from '../../pages/staff/supervisor-list/supervisor-list.component';
import {MechnicsListComponent} from '../../pages/staff/mechnics-list/mechnics-list.component';
import {ElectronicsListComponent} from '../../pages/staff/electronics-list/electronics-list.component';
import {StaffComponent} from '../../pages/staff/staff.component';
import {ProductionManagementComponent} from '../../pages/production-management/production-management.component';
import {OperationListComponent} from '../../pages/production-management/operation-list/operation-list.component';
import {SequenceListComponent} from '../../pages/production-management/sequence-list/sequence-list.component';
import {ArticleListComponent} from '../../pages/production-management/article-list/article-list.component';
import {OrderBundleComponent} from '../../pages/order-bundle/order-bundle.component';
import {UpdateOrderComponent} from '../../pages/order-bundle/update-order/update-order.component';


export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user', component: UserComponent},
  {path: 'typography', component: TypographyComponent},
  {path: 'icons', component: IconsComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'upgrade', component: UpgradeComponent},
  {
    path: 'users', component: UsersComponent, children: [
      {path: 'UserList', component: UsersListComponent},
      {path: 'CustomerList', component: CustomersListComponent},
      {path: 'SiteList', component: SitesListComponent},
      {path: 'ProfileList', component: ProfileListComponent}
    ]
  },

  {path: 'sites', component: SitesComponent},
  {
    path: 'lines', component: LinesComponent, children: [
      {path: 'LineList', component: LinesListComponent},
      {path: 'MachineList', component: MachineListComponent},
      {path: 'MachineTypeList', component: MachineTypeListComponent},
    ]
  },
  {
    path: 'staff', component: StaffComponent, children: [
      {path: 'OperatorList', component: OperatorListComponent},
      {path: 'SupervisorList', component: SupervisorListComponent},
      {path: 'MechanicList', component: MechnicsListComponent},
      {path: 'ElectronicList', component: ElectronicsListComponent},
    ]
  },
  {path: 'profiles', component: ProfilesComponent},
  {
    path: 'production', component: ProductionManagementComponent, children: [

      {path: 'OperationList', component: OperationListComponent},
      {path: 'ArticleList', component: ArticleListComponent},
      {path: ':id/SequenceList', component: SequenceListComponent}
    ]
  },

  { path: 'updateOrder', component: UpdateOrderComponent},
  { path: 'AddOrderWBundles', component: OrderBundleComponent},

];

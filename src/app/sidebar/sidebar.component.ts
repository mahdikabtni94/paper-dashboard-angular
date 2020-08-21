import {Component} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {BehaviorSubject, of} from 'rxjs';
import {AuthService} from '../auth/auth.service';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children: RouteInfo[];
  permissions?: any[];
  active?: boolean;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Setup',
    icon: '',
    class: '',
    permissions: ['Setup'],
    active: true,
    children: [
      {
        path: '/admin/users',
        title: 'Users',
        icon: 'person_add',
        class: '',
        active: true,
        children: [],
      },
      {
        path: '/admin/lines',
        title: 'Lines/Machines',
        icon: 'link',
        class: '',
        children: [],
        active: true,
      },
      {
        path: '/admin/Box',
        title: 'Boxs',
        icon: 'inbox',
        class: '',
        children: [],
        active: true,
      },


    ],
  },
  {
    path: '',
    title: 'Product Management',
    icon: '',
    class: '',
    permissions: ['Product Management'],
    active: true,
    children: [
      {
        path: '/admin/production',
        title: 'Articles/Operations',
        icon: 'playlist_add',
        class: '',
        active: true,
        children: [],
      },
      {
        path: '/admin/AddOrderWBundles',
        title: 'Orders',
        icon: 'note_add',
        class: '',
        active: true,
        children: [],
      },
      {
        path: '/admin/BundleList',
        title: 'Bundles Info',
        icon: 'apps',
        class: '',
        active: true,
        children: [],
      },
    ]
  },
  {
    path: '',
    title: 'Staff',
    icon: '',
    class: '',
    permissions: ['Staff'],
    active: true,
    children: [
      {
        path: '/admin',
        title: 'Attendance',
        icon: 'work',
        class: '',
        children: [],
        active: true,

      },
      {
        path: '/admin/staff',
        title: 'Staff',
        icon: 'person_pin',
        class: '',
        children: [],
        active: true,

      },
    ],
  },
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent {
  permissions: any;
  UserProfile: any;
  userFromStorage: any;
  public menuItems: any[];
  nestedTreeControl: NestedTreeControl<RouteInfo>;
  nestedDataSource: MatTreeNestedDataSource<RouteInfo>;
  dataChange: BehaviorSubject<RouteInfo[]> = new BehaviorSubject<RouteInfo[]>([]);

  constructor(private authService: AuthService) {
    this.userFromStorage = this.authService.getToken();
    const tokenInfo = this.authService.getDecodedAccessToken(this.userFromStorage);
    this.UserProfile = tokenInfo.permissions;
    console.log('Userprofileeeeeeeee', this.UserProfile);
    if (this.UserProfile ) {

      this.menuItems = ROUTES.filter(menuItem => {
        if (menuItem.permissions && this.UserProfile.indexOf(menuItem.permissions[0]) === -1) {

          return null
        } else {
          if (menuItem.children && menuItem.children.length) {
            let i = 0;

            let menuItemSize = 0;
            menuItem.children.forEach(submenu => {

              if (submenu.permissions && this.UserProfile.indexOf
              (submenu.permissions[0]) === -1) {
                menuItem.children[i].active = false;
                menuItemSize++;
              } else {
                menuItem.children[i].active = true;

              }
              i++;

            })

            // menuItem.badge = String(menuItem.submenu.length - menuItemSize);
          }
          return menuItem
        }
      });
    } else {
      console.log('not permissions')
    }
    this.nestedTreeControl = new NestedTreeControl<RouteInfo>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataChange.subscribe(data => this.nestedDataSource.data = data);

    this.dataChange.next(this.menuItems);
  }

  private _getChildren = (node: RouteInfo) => of(node.children);
  hasNestedChild = (_: number, nodeData: RouteInfo) => !(nodeData.path);


}

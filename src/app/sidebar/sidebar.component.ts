import {Component} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {BehaviorSubject, of} from 'rxjs';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children: RouteInfo[];
}

export const ROUTES = [
  {path: '/admin/dashboard', title: 'Dashboard', icon: 'nc-bank', class: ''},
  {path: '/admin/icons', title: 'Icons', icon: 'nc-diamond', class: ''},
  {path: '/admin/maps', title: 'Maps', icon: 'nc-pin-3', class: ''},
  {path: '/admin/notifications', title: 'Notifications', icon: 'nc-bell-55', class: ''},
  {path: '/admin/user', title: 'User Profile', icon: 'nc-single-02', class: ''},
  {path: '/admin/typography', title: 'Typography', icon: 'nc-caps-small', class: ''},
  {path: '/admin/users', title: 'Users', icon: 'nc-circle-10', class: ''},
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent {
  public menuItems: any[];
  nestedTreeControl: NestedTreeControl<RouteInfo>;
  nestedDataSource: MatTreeNestedDataSource<RouteInfo>;
  dataChange: BehaviorSubject<RouteInfo[]> = new BehaviorSubject<RouteInfo[]>([]);

  constructor() {
    this.nestedTreeControl = new NestedTreeControl<RouteInfo>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataChange.subscribe(data => this.nestedDataSource.data = data);

    this.dataChange.next([
      {
        path: '',
        title: 'Setup',
        icon: '',
        class: '',
        children: [
          {
            path: '/admin/users',
            title: 'Users',
            icon: 'person_add',
            class: '',
            children: [],
          },
          {
            path: '/admin/lines',
            title: 'Lines/Machines',
            icon: 'link',
            class: '',
            children: [],
          },
        ],
      },
      {
        path: '',
        title: 'Product Management',
        icon: '',
        class: '',
        children: [
          {
            path: '/admin/production',
            title: 'Articles/Operations',
            icon: 'playlist_add',
            class: '',
            children: [],
          },
          {
            path: '/admin/AddOrderWBundles',
            title: 'Orders',
            icon: 'note_add',
            class: '',
            children: [],
          },
        ]
      },
      {
        path: '',
        title: 'Staff',
        icon: '',
        class: '',
        children: [
          {
            path: '/admin',
            title: 'Attendance',
            icon: 'work',
            class: '',
            children: []

          },
          {
            path: '/admin/staff',
            title: 'Staff',
            icon: 'person_pin',
            class: '',
            children: []

          },
        ],
      },

    ]);
  }

  private _getChildren = (node: RouteInfo) => of(node.children);
  hasNestedChild = (_: number, nodeData: RouteInfo) => !(nodeData.path);

}

import {Component, OnInit} from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
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
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}

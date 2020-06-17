import {Component, OnInit} from '@angular/core';


export interface RouteUsers {
  path: string;
  label: string;
  icon: string;
}

export const UserRoutes: RouteUsers[] = [
  {path: '/admin/users/UserList', label: 'Users', icon: 'nc-single-02'},
  {path: '/admin/users/CustomerList', label: 'Customers', icon: 'nc-tv-2'},
  {path: '/admin/users/SiteList', label: 'Sites', icon: 'nc-layout-11'},
  {path: '/admin/users/ProfileList', label: 'Profiles', icon: 'nc-badge'},
]

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public menuItems: any[];


  constructor() {
  }

  ngOnInit(): void {
    this.menuItems = UserRoutes.filter(menuItem => menuItem);
  }


}

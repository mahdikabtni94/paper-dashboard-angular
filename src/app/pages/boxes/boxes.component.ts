import { Component, OnInit } from '@angular/core';
import {RouteUsers, UserRoutes} from '../users/users.component';
export const BoxRoutes: RouteUsers[] = [
  {path: '/admin/Box/BoxList', label: 'Boxs', icon: 'move_to_inbox'},

]
@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent implements OnInit {
  public menuItems: any[];
  constructor() { }

  ngOnInit() {
    this.menuItems = UserRoutes.filter(menuItem => menuItem);
  }

}

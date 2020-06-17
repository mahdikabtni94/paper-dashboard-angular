import {Component, OnInit} from '@angular/core';
import {RouteUsers} from '../users/users.component';

export const LineRoutes: RouteUsers[] = [
  {path: '/admin/lines/LineList', label: 'Lines', icon: 'link'},
  {path: '/admin/lines/MachineList', label: 'Machines', icon: 'settings'},
  {path: '/admin/lines/MachineTypeList', label: 'Machine Type', icon: 'settings_applications'},

]

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {
  public menuItems: any[];

  constructor() {
  }

  ngOnInit() {
    this.menuItems = LineRoutes.filter(menuItem => menuItem);
  }

}

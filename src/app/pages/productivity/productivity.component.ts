import {Component, OnInit} from '@angular/core';
import {RouteUsers} from '../users/users.component';
export const StatsRoutes: RouteUsers[] = [
  {path: '/admin/stats/Attendance', label: 'Attendance', icon: 'assignment_ind'},
  {path: '/admin/stats/Productivity', label: 'Productivity', icon: 'work'}

]

@Component({
  selector: 'app-productivity',
  templateUrl: './productivity.component.html',
  styleUrls: ['./productivity.component.scss']
})
export class ProductivityComponent implements OnInit {
  public menuItems: any[];

  constructor() {
  }

  ngOnInit() {
    this.menuItems = StatsRoutes.filter(menuItem => menuItem);
  }

}

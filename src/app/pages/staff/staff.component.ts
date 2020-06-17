import {Component, OnInit} from '@angular/core';
import {RouteUsers} from '../users/users.component';

export const StaffRoutes: RouteUsers[] = [
  {path: '/admin/staff/OperatorList', label: 'Operators', icon: 'person_pin'},
  {path: '/admin/staff/SupervisorList', label: 'Supervisors', icon: 'supervisor_account'},
  {path: '/admin/staff/MechanicList', label: 'Mechanics', icon: 'person'},
  {path: '/admin/staff/ElectronicList', label: 'Electronics', icon: 'person'},


]

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})


export class StaffComponent implements OnInit {
  public menuItems: any[];

  constructor() {

  }

  ngOnInit() {
    this.menuItems = StaffRoutes.filter(menuItem => menuItem);
  }

}

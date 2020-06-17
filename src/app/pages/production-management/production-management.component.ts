import {Component, OnInit} from '@angular/core';


export interface RouteProduction {
  path: string;
  label: string;
  icon: string;
}

export const ProductionRoutes: RouteProduction[] = [
  {path: '/admin/production/ArticleList', label: 'Articles', icon: 'file_copy'},
  {path: '/admin/production/OperationList', label: 'Operations', icon: 'insert_drive_file'},

];

@Component({
  selector: 'app-production-management',
  templateUrl: './production-management.component.html',
  styleUrls: ['./production-management.component.scss']
})

export class ProductionManagementComponent implements OnInit {
  public menuItems: any[];

  constructor() {
  }

  ngOnInit() {
    this.menuItems = ProductionRoutes.filter(menuItem => menuItem);
  }

}

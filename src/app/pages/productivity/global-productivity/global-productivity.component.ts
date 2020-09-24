import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-productivity',
  templateUrl: './global-productivity.component.html',
  styleUrls: ['./global-productivity.component.scss']
})
export class GlobalProductivityComponent implements OnInit {
  public doughnutChartLabels = ['Productivity'];
  public doughnutChartData = [100, 100];
  public doughnutChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}

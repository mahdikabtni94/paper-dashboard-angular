import {Component, OnInit} from '@angular/core';
import {GlobalProductivityService} from './global_productivity.service';
import {Subscription} from 'rxjs';
import {LineService} from '../../lines/line.service';
import {DatePipe} from '@angular/common'


@Component({
  selector: 'app-global-productivity',
  templateUrl: './global-productivity.component.html',
  styleUrls: ['./global-productivity.component.scss'],
})

export class GlobalProductivityComponent implements OnInit {
  productivities: any[] = [];
  producititiesUpdated = [];
  private productivitySub: Subscription;
  lines: any[] = [];
  lineSub: Subscription;
  public doughnutChartLabels = ['Productivity'];
  public doughnutChartData = [100];
  public doughnutChartType = 'doughnut';
  public lineSelected = false;
  public dateSelected = false;
  private SelectedLine: string;
  date: string;

  constructor(public globalProductivityService: GlobalProductivityService,
              public lineService: LineService,
              public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.lineService.getLines();
    this.lineSub = this.lineService.getlineUpdateListner().subscribe((lines) => {
      this.lines = lines;
    });
    this.globalProductivityService.getglobalProductivity();
    this.productivitySub = this.globalProductivityService.getGlobalProductivityUpdateListner().subscribe((products) => {
      this.productivities = products;
    })
  }

  addLineTemplate = (term) => ({line_id: term, line_label: term});


  onSelectLine() {
    this.lineSelected = true;
   this.producititiesUpdated = this.productivities.filter(productivityStats => productivityStats.line_id == this.SelectedLine);

  }

  SelectedDate() {
    this.dateSelected = true;
    const latest_date = this.datepipe.transform(this.date, 'yyyy/MM/dd');
    this.producititiesUpdated = this.productivities.filter(productivityStats => productivityStats.day_session == latest_date.toString());
  }
}

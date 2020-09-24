import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CpsStatsService} from './cpsStats.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
  cpsStats: any[] = [];
  private cpsStatsSub: Subscription;

  constructor(public dialogref: MatDialogRef<EmployeeInfoComponent>,
              public cpsStatsService: CpsStatsService,
              @Inject(MAT_DIALOG_DATA) public daykey: any) {
  }

  ngOnInit() {
    console.log('cpsdayyyy', this.daykey.cpsDay);
    console.log('cpsEmpppppppppppp', this.daykey.cpsEmp);
    this.cpsStatsService.getcpsStats();
    this.cpsStatsSub = this.cpsStatsService.getEmployeStatsUpdateListner().subscribe((cpsStats) => {
      this.cpsStats = cpsStats;
      this.cpsStats.filter(cps => cps.date_operation == this.daykey.cpsDay && cps.EmployeeId == this.daykey.cpsEmp);
      cpsStats.forEach(cps => {
        if (cps.reparation == null) {
          cps.reparation = 0;

        }
      })
    })
  }

  onClose() {
    this.dialogref.close();
  }
}

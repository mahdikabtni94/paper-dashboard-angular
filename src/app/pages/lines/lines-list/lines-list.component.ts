import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Subscription} from 'rxjs';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {LineModel} from '../line.model';
import {LineService} from '../line.service';
import {CreateLineComponent} from '../create-line/create-line.component';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.scss']
})
export class LinesListComponent implements OnInit, OnDestroy {
  lines: MatTableDataSource<LineModel>;
  displayedColumns: string[] = ['line_label', 'line_description',
    'site.site_label', 'actions'];
  private lineSub: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;
  isloading = false;

  constructor(public lineService: LineService,
              private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    this.lineService.getLines();
    this.isloading = true;
    this.lineSub = this.lineService.getlineUpdateListner()
      .subscribe((lines) => {
        this.isloading = false;
        this.lines = new MatTableDataSource(lines);
        setTimeout(() => {
          this.lines.sort = this.sort;
          this.lines.paginator = this.paginator;
        });
        this.lines.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });
  }

  onEdit(row) {
    this.lineService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateLineComponent, dialogConfig);
  }

  onDelete(line_id) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Line ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.lineService.Deleteline(line_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });
  }

  onCreateline() {
    this.lineService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateLineComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.lines.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.lineSub.unsubscribe();
  }

}




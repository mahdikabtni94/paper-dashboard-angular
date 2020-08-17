import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {BoxService} from '../boxes.service';
import {CreateBoxComponent} from '../create-box/create-box.component';
import {BoxModel} from '../boxes.model';

@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent implements OnInit, OnDestroy {

  boxs: MatTableDataSource<BoxModel>;
  displayedColumns: string[] = ['box_label', 'address_mac',
    'description', 'site.site_label', 'machine.machine_label', 'actions'];
  private boxSub: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;
  isloading = false;

  constructor(public boxService: BoxService,
              private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    this.boxService.getboxs();
    this.isloading = true;
    this.boxSub = this.boxService.getboxUpdateListner()
      .subscribe((boxs) => {
        this.isloading = false;
        this.boxs = new MatTableDataSource(boxs);
        setTimeout(() => {
          this.boxs.sort = this.sort;
          this.boxs.paginator = this.paginator;
        });
        this.boxs.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });
  }

  onEdit(row) {
    this.boxService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateBoxComponent, dialogConfig);
  }

  onDelete(box_id) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this box ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.boxService.Deletebox(box_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });
  }

  onCreatebox() {
    this.boxService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateBoxComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.boxs.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.boxSub.unsubscribe();
  }


}

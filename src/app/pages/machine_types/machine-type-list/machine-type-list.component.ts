import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {MachineTypeTypeService} from '../machine-type.service';
import {MachineTypeModel} from '../machine_type.model';
import {CreateMachineTypeComponent} from '../create-machine-type/create-machine-type.component';

@Component({
  selector: 'app-machine-type-list',
  templateUrl: './machine-type-list.component.html',
  styleUrls: ['./machine-type-list.component.scss']
})
export class MachineTypeListComponent implements OnInit, OnDestroy {
  MachineTypes: MatTableDataSource<MachineTypeModel>;
  displayedColumns: string[] = ['type', 'description', 'actions'];
  private typeSub: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;
  isloading = false;

  constructor(public machineTypeService: MachineTypeTypeService,
              private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService) {
  }

  ngOnInit() {
    this.machineTypeService.getMachineTypes();
    this.isloading = true;
    this.typeSub = this.machineTypeService.getMachineTypeUpdateListner()
      .subscribe((machineTypes) => {
        this.isloading = false;
        this.MachineTypes = new MatTableDataSource<MachineTypeModel>(machineTypes);
        setTimeout(() => {
          this.MachineTypes.sort = this.sort;
          this.MachineTypes.paginator = this.paginator;
        });

        this.MachineTypes.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });
  }


  onEdit(row) {
    this.machineTypeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateMachineTypeComponent, dialogConfig);
  }

  onDelete(type_id) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this Type ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.machineTypeService.DeleteMachineType(type_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });
  }

  onCreateType() {
    this.machineTypeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateMachineTypeComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.MachineTypes.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.typeSub.unsubscribe();
  }


}

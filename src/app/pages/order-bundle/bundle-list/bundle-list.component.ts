import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {BundleModel} from '../bundle.model';
import {BundleService} from '../bundle.service';

@Component({
  selector: 'app-bundle-list',
  templateUrl: './bundle-list.component.html',
  styleUrls: ['./bundle-list.component.scss']
})
export class BundleListComponent implements OnInit, OnDestroy {
  bundles: MatTableDataSource<BundleModel>;
  displayedColumns: string[] = ['code', 'num_bundle', 'size', 'quantity', 'order.order_label', 'Start_date', 'finish_date'];
  private bundleSub: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;
  isloading = false;

  constructor(public bundleService: BundleService) {
  }

  ngOnInit() {
    this.bundleService.getbundles();
    this.isloading = true;
    this.bundleSub = this.bundleService.getbundlesUpdateListner()
      .subscribe((bundles) => {
        this.isloading = false;
        this.bundles = new MatTableDataSource<BundleModel>(bundles);
        setTimeout(() => {
          this.bundles.sort = this.sort;
          this.bundles.paginator = this.paginator;
        });
        this.bundles.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele === 'code'   && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.bundles.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.bundleSub.unsubscribe();
  }

}

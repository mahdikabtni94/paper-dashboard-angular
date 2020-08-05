import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {ArticleModel} from './article.model';
import {NotificationService} from '../../../notification.service';
import {DialogService} from '../../../dialog.service';
import {ArticleService} from './article.service';
import {CreateArticleComponent} from '../create-article/create-article.component';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  articles: MatTableDataSource<ArticleModel>;
  displayedColumns: string[] = ['article_name', 'code', 'description', 'actions'];
  private articleSub: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;
  isloading = false;

  constructor(public articleService: ArticleService,
              private  dialog: MatDialog,
              private notificationService: NotificationService,
              private  dialogService: DialogService) {
  }

  ngOnInit() {
    this.articleService.getArticles();
    this.isloading = true;
    this.articleSub = this.articleService.getarticlesUpdateListner()
      .subscribe((articles) => {
        this.isloading = false;
        this.articles = new MatTableDataSource(articles);
        setTimeout(() => {
          this.articles.sort = this.sort;
          this.articles.paginator = this.paginator;
        });
        this.articles.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      });
  }

  onEdit(row) {
    this.articleService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    this.dialog.open(CreateArticleComponent, dialogConfig);
  }

  onDelete(article_id) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this article ?').afterClosed()
      .subscribe(res => {
        if (res) {
          this.articleService.DeleteArticle(article_id);
          this.notificationService.warn(' Deleted successfully!!');
        }
      });
  }

  onCreatearticle() {
    this.articleService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    this.dialog.open(CreateArticleComponent, dialogConfig);

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.articles.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.articleSub.unsubscribe();
  }
}

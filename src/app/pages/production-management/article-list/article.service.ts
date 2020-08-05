import {environment} from '../../../../environments/environment';
import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {ArticleModel} from './article.model';
import {Subject} from 'rxjs';
import {OperationModel} from '../operation-list/operation.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: ArticleModel[] = [];
  private articlesUpdated = new Subject<ArticleModel[]>();
  private operations: any[] = [];
  private operationsUpdated = new Subject<any[]>();
  form: FormGroup = new FormGroup({
    article_id: new FormControl(null),
    code: new FormControl(''),
    article_name: new FormControl('', Validators.required),
    description: new FormControl(''),
    operation_templates: new FormControl([], Validators.required),

  });

  constructor(private http: HttpClient, private  router: Router) {
  }

  getArticles() {
    this.http.get<{ message: string, data: any }>(BACKEND_URL + '/api/article/find')
      .pipe(map((articleData) => {
        return articleData.data.map(article => {
          const operationList: string[] = [];
          article.operation_templates.forEach(operation => {
            operationList.push(operation.operation_template_id)
          });
          return {
            article_id: article.article_id,
            code: article.code,
            description: article.description,
            operation_templates: operationList,
            article_name: article.article_name,

          };
        });
      }))
      .subscribe((transformedarticles) => {
        this.articles = transformedarticles;
        this.articlesUpdated.next([...this.articles]);

      });
  }

  getarticlesUpdateListner() {
    return this.articlesUpdated.asObservable();
  }

  Addarticle(article_name: string, code: string, description: string, operations: []) {

    const Data = {
      'article_name': article_name,
      'code': code,
      'description': description,
      'operation_templates': operations

    };
    this.http.post<{ message: string, data: ArticleModel }>(BACKEND_URL + '/api/article/add', Data)
      .subscribe((responseData) => {
        const article: ArticleModel = {
          article_id: responseData.data.article_id,
          article_name: article_name,
          code: code,
          description: description,
          operation_templates: operations

        };
        this.articles.push(article);
        this.articlesUpdated.next([...this.articles]);
        this.router.navigate(['/admin/production/ArticleList']);

      });
  }

  UpdateArticle(article_id: string, code: string,
                article_name: string,
                description: string, operations: []) {

    const articleData = {
      article_id: article_id,
      article_name: article_name,
      code: code,
      description: description,
      operation_templates: operations

    };
    this.http.put<{ message: string, data: ArticleModel }>
    (BACKEND_URL + '/api/article/update/' + article_id, articleData)
      .subscribe(responseData => {
        const Updatedarticles = [...this.articles];
        const oldUserIndex = Updatedarticles.findIndex(p => p.article_id === article_id);
        const article: ArticleModel = {
          article_id: article_id,
          article_name: article_name,
          code: code,
          description: description,
          operation_templates: operations

        };
        Updatedarticles[oldUserIndex] = article;
        this.articles = Updatedarticles;
        this.articlesUpdated.next([...this.articles]);
        this.router.navigate(['admin/production/ArticleList']);


      })

  }

  DeleteArticle(articleid: String) {
    this.http.delete(BACKEND_URL + '/api/article/delete/' + articleid).subscribe(
      () => {
        const updatedarticle = this.articles.filter(article => article.article_id !== articleid);
        this.articles = updatedarticle;
        this.articlesUpdated.next([...this.articles]);
      }
    );
  }


  populateForm(article) {
    setTimeout(() => {
      this.form.patchValue(article);
    });
  }

  initializeFormGroup() {
    this.form.patchValue({
      'article_id': null,
      'article_name': '',
      'code': '',
      'description': '',
      'operation_templates': []

    });
  }

  FindOperationsByArticleId(articleid: string) {
    this.http.get<{ message: string, data: OperationModel[] }>(BACKEND_URL + '/api/article/findOperationsById/' + articleid)
      .pipe(map((operationData) => {
        return operationData.data.map(operations => {
          return {
            operation_template_id: operations.operation_template_id,
            label: operations.label,
            description: operations.description,
            MachineTypeId: operations.MachineTypeId,
            time: operations.time,
            accMinPrice: operations.accMinPrice,
            with_subsequence: operations.with_subsequence

          };
        });
      }))
      .subscribe((operations) => {
        this.operations = operations;
        this.operationsUpdated.next([...this.operations]);

      });
  }
  getOperationsUpdateListner() {
    return this.operationsUpdated.asObservable();
  }
}

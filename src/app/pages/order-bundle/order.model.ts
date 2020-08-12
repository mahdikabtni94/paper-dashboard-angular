import {ArticleModel} from '../production-management/article-list/article.model';
import {CustomerModel} from '../../customers/customer.model';

export interface OrderModel {
  order_id: string;
  order_label?: string;
  order_code?: string;
  order_description?: string;
  quantity?: string;
  ArticleId?: string;
  CustomerId?: string;
  article?: ArticleModel;
  customer?: CustomerModel;
  bundles?: any[];

}

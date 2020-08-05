import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit {
  public keyword = 'order_code';
  public orderList = [];
  private orderSub: Subscription;
  isLoadingResult: boolean;

  constructor(private orderService: OrderService) {

  }

  ngOnInit() {

  }


  ShowInput($event: any) {
    this.isLoadingResult = true;
    this.orderService.getorders();
    this.orderSub = this.orderService.getordersUpdateListner().subscribe(
      (orders) => {
        this.orderList = orders
      }
    )
    console.log('aaaaaaaaaaaaaa', $event);
    this.isLoadingResult = false;

  }
}

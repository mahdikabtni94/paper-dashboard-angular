import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
@Pipe({name: 'time_counter'})
export class TimeCounterPipe implements PipeTransform {
  transform(value: any): any {
    if (!value) {
      return value;
    }
    return moment().startOf('day').add(value, 'seconds').format('HH:mm:ss');
  }
}

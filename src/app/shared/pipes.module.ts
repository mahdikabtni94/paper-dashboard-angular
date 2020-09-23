import {NgModule} from '@angular/core';
import {TimeCounterPipe} from './timecounter';


@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [
    TimeCounterPipe,


  ],
  exports: [
    TimeCounterPipe
  ]
})
export class PipesModule {
}

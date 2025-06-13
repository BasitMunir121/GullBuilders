import { NgModule } from '@angular/core';
import { DatetimeDifferencePipe } from '../../pipe/datetime-difference.pipe';
@NgModule({
  declarations: [DatetimeDifferencePipe],
  exports: [DatetimeDifferencePipe]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { ToggleDirective } from './toggle.directive';

@NgModule({
  declarations: [ToggleDirective],
  exports: [ToggleDirective],
})
export class SharedModule {}

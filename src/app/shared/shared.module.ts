import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from '../directives/click-outside.directive';


@NgModule({
  declarations: [ClickOutsideDirective],
  exports: [ClickOutsideDirective]
})
export class SharedModule { }

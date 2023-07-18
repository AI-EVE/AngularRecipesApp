import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggle]',
})
export class ToggleDirective {
  @HostBinding('class.open') isOpen: boolean = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  constructor() {}
}

import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  
  @HostBinding('class.open') isOpen = false;

  constructor(private elRef: ElementRef) {}
  
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    const clickedOnMyElement = this.elRef.nativeElement.contains(event.target);
    this.isOpen = clickedOnMyElement ? !this.isOpen : false;
  }
  
}

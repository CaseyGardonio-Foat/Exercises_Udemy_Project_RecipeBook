import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') dropdownOpen: boolean = false;

    @HostListener('click') toggleOpen(eventData: Event){
        this.dropdownOpen = !this.dropdownOpen;

    }

    /* to put close the dropdown with a click anywhere on the page, replace the above @HostListener code with this:
    @HostListener('document:click', [$event]') toggleOpen(eventData: Event){
        this.dropdownOpen = this.elRef.nativeElement.contains(event.target) ? this.isOpen: false;
    }
    constructor(private elRef: ElementRef) {}
    *(n.b remember to import ElementRef from @angular/core) */
}
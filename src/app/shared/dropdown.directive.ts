import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') dropdownOpen: boolean = false;

    @HostListener('click') toggleOpen(eventData: Event){
        this.dropdownOpen = !this.dropdownOpen;

    }

}
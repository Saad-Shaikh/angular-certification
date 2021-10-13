import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    isOpen: boolean = false;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    @HostListener('click') toggleDropdown(): void {
        if(!this.isOpen)
            this.renderer.addClass(this.elementRef.nativeElement, 'open');
        else
            this.renderer.removeClass(this.elementRef.nativeElement, 'open');
        this.isOpen = !this.isOpen;
    }
}
import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlightStatus]',
    standalone: true
})
export class HighlightStatusDirective implements OnChanges {
    @Input() appHighlightStatus: string = '';

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges(): void {
        const status = this.appHighlightStatus.toUpperCase();
        let color = '';

        switch (status) {
            case 'ABSENT':
            case 'REJECTED':
                color = '#ffebee'; // Light red
                break;
            case 'PENDING':
                color = '#fff3e0'; // Light orange
                break;
            case 'PRESENT':
            case 'APPROVED':
                color = '#e8f5e9'; // Light green
                break;
            case 'WFH':
                color = '#e3f2fd'; // Light blue
                break;
            default:
                color = 'transparent';
        }

        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
        this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '4px');
        this.renderer.setStyle(this.el.nativeElement, 'padding', '2px 8px');
    }
}

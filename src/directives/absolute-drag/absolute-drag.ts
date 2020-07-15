import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { DomController } from 'ionic-angular';
 
@Directive({
  selector: '[absolute-drag]'
})
export class AbsoluteDragDirective {
 
    @Input('startLeft') startLeft: any;
    @Input('startTop') startTop: any;
 
    constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController) {
 
    }
 
    ngAfterViewInit() {
 
        this.renderer.setElementStyle(this.element.nativeElement, 'position', 'fixed');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');
 
        let hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });
 
        hammer.on('pan', (ev) => {
          this.handlePan(ev);
        });
 
    }
 
    handlePan(ev){
        
        let newLeft = ev.center.x - ev.target.parentElement.getBoundingClientRect().bottom;
        let newTop = ev.center.y - ev.target.parentElement.getBoundingClientRect().top;
       // let newLeft = ev.center.x;
        //let newTop = ev.center.y;
       
        if(newTop>60 && newTop<500){
        this.domCtrl.write(() => {
            this.renderer.setElementStyle(this.element.nativeElement, 'bottom', newLeft + 'px');
            this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
        });
        }
    }
    
 
}
export { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

 import { Component, Directive, Injectable, Input } from '@angular/core';
 import { NavigationExtras } from '@angular/router';

 @Directive({
   selector: '[routerLink]',
   host: {
     '(click)': 'onClick()'
   }
 })
 export class RouterLinkStubDirective {
   @Input('routerLink') linkParams: any;
   navigatedTo: any = null;

   onClick() {
     this.navigatedTo = this.linkParams;
   }
 }
 // #enddocregion router-link

@Directive({
  selector: '[queryParams]'
})
export class QueryParamsStubDirective {
  @Input('queryParams') queryParams: any;
}

 @Component({selector: 'router-outlet', template: ''})
 export class RouterOutletStubComponent { }

 @Injectable()
 export class RouterStub {
   navigate(commands: any[], extras?: NavigationExtras) { }
 }
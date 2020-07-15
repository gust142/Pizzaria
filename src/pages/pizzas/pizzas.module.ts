import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzasPage } from './pizzas';

@NgModule({
  declarations: [
    PizzasPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzasPage),
  ],
  exports:[
    PizzasPage
  ]
})
export class PizzasPageModule {}

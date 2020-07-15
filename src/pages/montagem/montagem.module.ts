import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MontagemPage } from './montagem';

@NgModule({
  declarations: [
    MontagemPage,
  ],
  imports: [
    IonicPageModule.forChild(MontagemPage),
  ],
})
export class MontagemPageModule {}

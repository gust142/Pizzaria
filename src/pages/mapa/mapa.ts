import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

declare var google:any;
/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation. 
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  maps:any;
  
  @ViewChild("map") MapRef: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.mapa();
  }

  mapa(){
    const location = new google.maps.LatLng('-2.506327', '-44.266065');
    const opcoes = {
      center: location,
      zoom: 15
    }
     this.maps = new google.maps.Map(this.MapRef.nativeElement,opcoes);
  }

  telahome(){
    this.navCtrl.setRoot(HomePage);
  }
}

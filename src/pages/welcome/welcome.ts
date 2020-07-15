import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert, ToastController } from 'ionic-angular';
import{Geolocation}from '@ionic-native/geolocation'
import { HomePage } from '../home/home';
import { LocalizacaoProvider } from '../../providers/localizacao/localizacao';
import { HttpClient } from '@angular/common/http';


declare var google:any;
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  
  endereco_atual:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public geo:Geolocation,
   public alert:AlertController, public localizacao:LocalizacaoProvider, public toast:ToastController)  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  
  localizacao_atual(){
    this.geo.getCurrentPosition().then((resp) => {
      //this.navCtrl.setRoot(HomePage)
     
       this.localizacao.acharcidade(resp.coords.latitude,resp.coords.longitude).subscribe(data => {
                  this.endereco_atual = data;
                  //console.log(this.endereco_atual.results[0].formatted_address)
                  this.navCtrl.setRoot(HomePage)
                });
        
     }).catch((error) => {
      let toast = this.toast.create({
        message: 'Não foi possivel encontrar sua localização, verifique sua conexão de internet',
        duration: 3000
      });
      toast.present();
      this.navCtrl.setRoot(HomePage)
       //console.log('Error getting location', error);
     });   
  }

  pular(){
    this.navCtrl.setRoot(HomePage);
  }

}

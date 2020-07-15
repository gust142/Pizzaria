import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { HomePage } from '../home/home';

/**
 * Generated class for the BebidasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bebidas',
  templateUrl: 'bebidas.html',
})
export class BebidasPage {

  bebidas: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afd: AngularFireDatabase) {
    this.bebidas = this.afd.list("/bebidas/");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BebidasPage');
  }

  telahome(){
    this.navCtrl.setRoot(HomePage);
  }

}

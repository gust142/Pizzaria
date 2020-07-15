import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ConcluirCadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-concluir-cadastro',
  templateUrl: 'concluir-cadastro.html',
})
export class ConcluirCadastroPage {
  user:any
  endereco:any
  usuarios: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afd:AngularFireDatabase,
    public afa:AngularFireAuth) {
    this.user = this.navParams.get('usuario')
    this.usuarios = this.afd.list('/usuario');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConcluirCadastroPage');
  }


  confirmar_cadastro(){
    var logado = this.afa.auth.currentUser
      if(this.endereco!=null){
        this.usuarios.push({
          nome:this.user.displayName,
          email:this.user.email,
          endereco:this.endereco,
          uid: logado.uid
        })
        this.navCtrl.setRoot(HomePage)
      }else{

      }

  }

}

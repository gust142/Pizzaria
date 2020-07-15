import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { UsuarioModel } from '../../modelos/modelo_usuario';
import { RedefinicaoPage } from '../redefinicao/redefinicao';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  usuario:UsuarioModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afa:AngularFireAuth) {
     this.usuario = this.navParams.get('usuario')
    
    
    
  }

  ionViewDidLoad() {
   
  }
  
  tela_redefinicao(usuario:UsuarioModel){ 
    this.navCtrl.push(RedefinicaoPage,{
      modelo: usuario
    })
  }

  finalizar_sessao(){
    this.afa.auth.signOut().then(auth=> {
      this.navCtrl.pop();
    }).catch(function(error) {
      // An error happened.
    });
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { UsuarioModel } from '../../modelos/modelo_usuario';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RedefinicaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redefinicao',
  templateUrl: 'redefinicao.html',
})
export class RedefinicaoPage {

  usuario:UsuarioModel

  constructor(public navCtrl: NavController, public navParams: NavParams, public afa:AngularFireAuth,
  public toast:ToastController) {
      this.usuario = this.navParams.get('modelo')

  }

  ionViewDidLoad() {
    
  }

  redefinir_senha(usuario:UsuarioModel){
      
    this.afa.auth.sendPasswordResetEmail(usuario.email).then(auth=>{
        let toast = this.toast.create({
          message:'O Email de verificação foi enviado. Entre em seu Email para continuar com a operação',
          duration: 3000
        })
        toast.present();
        this.afa.auth.signOut().then(function() {
          this.navCtrl.pop();
        }).catch(function(error) {
          // An error happened.
        });
        this.navCtrl.pop();
    }).catch(error=>{
      let toast = this.toast.create({
        message:'Ocorreu um erro. Tente novamente mais tarde.',
        duration: 3000
      })
      toast.present()
    })
  }

}

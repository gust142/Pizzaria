import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { CadastroPage } from '../cadastro/cadastro';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Auth } from 'angularfire2/interfaces';
import { HomePage } from '../home/home';
import firebase from 'firebase'
import{Facebook} from '@ionic-native/facebook'
import { UsuarioModel } from '../../modelos/modelo_usuario';
import { FirebaseListObservable } from 'angularfire2/database';
import { ConcluirCadastroPage } from '../concluir-cadastro/concluir-cadastro';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    email:any;
    senha:any;
    logged:boolean;
    lista_usuario: FirebaseListObservable<any[]>
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public fp:FirebaseProvider,
    public afa: AngularFireAuth, public toast:ToastController,public fb:Facebook,public platform:Platform) {
         
  }

  ionViewDidLoad() {
    //var usuario = this.aut.currentUser;
    
    console.log('ionViewDidLoad LoginPage');
  }


  login(){
   if(this.email == null||this.senha == null){
    let toast = this.toast.create({
      message: 'Por favor, preencha os campos corretamente e certifique-se que não há campos em branco',
      duration: 3000
    });
    toast.present();
      
   }else{
    this.afa.auth.signInWithEmailAndPassword(this.email, this.senha)
    .then(auth => {
          //console.log('funcionou');
          this.navCtrl.setRoot(HomePage);
          
       })
    .catch(err => { 
      let toast = this.toast.create({
        message: 'Email e /ou senha incorretos.',
        duration: 3000
      });
      this.email = "";
      this.senha = "";
      toast.present();
  
       });
      }
      

  }
  
  login_com_facebook(){
      var user
      var provider = new firebase.auth.FacebookAuthProvider();
      this.afa.auth.signInWithPopup(provider).then(res=>{
         user = res.user;
        this.lista_usuario = this.fp.filtrarPorEmail(user.email)
        this.lista_usuario.forEach(element => {
          if(element.length==0){
            console.log(element.length)
            this.navCtrl.push(ConcluirCadastroPage,{
              usuario: user
            })
          }else{
            this.navCtrl.pop();
          }
        });
        

      }).catch(err=>{
        console.log(err)
      })
    
  }
  /*login_com_facebook(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res) => console.log('Logged into Facebook!'))
  .catch(e => console.log('Error logging into Facebook', e));  
}*/

  tela_cadastro (){
    this.navCtrl.push(CadastroPage);
  }

}

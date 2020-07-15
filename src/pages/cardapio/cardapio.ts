import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PizzasPage } from '../pizzas/pizzas';
import { BebidasPage } from '../bebidas/bebidas';
import { HomePage } from '../home/home';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { MontagemPage } from '../montagem/montagem';
import { UsuarioModel } from '../../modelos/modelo_usuario';
import { LoginPage } from '../login/login';
import { UsuarioPage } from '../usuario/usuario';

/**
 * Generated class for the CardapioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {

  email :any;
  lista: FirebaseListObservable<any[]>;
  usuario: UsuarioModel
  bool:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fp:FirebaseProvider,
  public afa:AngularFireAuth ) {
  }

  ionViewDidLoad() {
    
  }

  telapizza(){
    this.navCtrl.push(PizzasPage);
  }

  telamontagem(){
    this.navCtrl.push(MontagemPage);
  }
  telahome(){
    this.navCtrl.setRoot(HomePage);
  }

  telalogin(){ 
 
    this.bool = false;
    var logado  = this.afa.auth.currentUser;
       if (logado) {
           this.bool = true; 
            
           
         } 
           this.direcionarUsuario(this.bool,logado);
 
  }
   direcionarUsuario(usuariologado:boolean,logado){
     if((!usuariologado)){
       console.log('ta deslogado')
         this.navCtrl.push(LoginPage);
      }else{
         this.lista = this.fp.filtrarPorUid(logado.uid);
         this.lista.forEach(element => {
           this.usuario = element[0]
             this.navCtrl.push(UsuarioPage,{
                 usuario: this.usuario
             }); 
         });
        
             
      }
       
      
   }
}


import { NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MapaPage } from '../mapa/mapa';
import { CardapioPage } from '../cardapio/cardapio';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { Auth } from 'angularfire2/interfaces';
import { User } from 'firebase/app';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';
import { StorageProvider } from '../../providers/storage/storage';
import { UsuarioPage } from '../usuario/usuario';
import { UsuarioModel } from '../../modelos/modelo_usuario';



declare var google:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email: any;
 
  lista: FirebaseListObservable<any[]>;
  usuario: UsuarioModel
  bool:boolean;
  constructor(public navCtrl: NavController, public afa:AngularFireAuth,public alertCtrl:AlertController,
  public fp:FirebaseProvider,public storage:StorageProvider) {
      this.ionViewDidLoad();
  }
  ionViewDidLoad() {
    /*var logado  = this.afa.auth.currentUser;
      if (logado) {
        console.log(logado.email)
          this.email = logado.email;
          this.lista = this.fp.filtrarPorEmail(this.email);
          this.usuario = this.lista[0]
        } else{

        }*/
        this.storage.lista_local();
  }
  
 tela_mapa(){
  this.navCtrl.push(MapaPage);

 }

 tela_cardapio(){
   this.navCtrl.push(CardapioPage);
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
       this.lista = null
       this.usuario = null
        this.lista = this.fp.filtrarPorUid(logado.uid);
        
        this.lista.forEach(element => {
          console.log(element.length)
          this.usuario = element[0]
          console.log(element[0])
            this.navCtrl.push(UsuarioPage,{
                usuario: this.usuario
            }); 
        });
       
            
     }
      
     
  }

 /* logout(){
    this.afa.auth.signOut().then(function() {
      console.log('logout feito')
    }).catch(function(error) {
      // An error happened.
    });
  }*/

  instagram(){
    window.open('https://www.instagram.com/pizzahomebr/','_system')
  }
}



import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { MontagemPage } from '../montagem/montagem';
import { HomePage } from '../home/home';
import { CarrinhoPage } from '../carrinho/carrinho';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { PizzaModel } from '../../modelos/modelo_pizza';
import { StorageProvider } from '../../providers/storage/storage';
import { UsuarioModel } from '../../modelos/modelo_usuario';
import { UsuarioPage } from '../usuario/usuario';


/**
 * Generated class for the PizzasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pizzas',
  templateUrl: 'pizzas.html',
})
export class PizzasPage {

    pizzas: FirebaseListObservable<any[]>;
    pizzaModel: PizzaModel;
    usuario: UsuarioModel

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController,
    public modalCtrl:ModalController, public fp: FirebaseProvider, public afa:AngularFireAuth,
    public storage:StorageProvider, public load:LoadingController) {
      this.usuario = this.navParams.get('usuario')
  }
  
  ionViewDidLoad() {
    
    this.pizzas = this.fp.getItems();
		console.log(this.pizzas)
    
  }

  selecionar(pizzaSelecionada){
    
    this.pizzaModel = pizzaSelecionada
    var logado = this.afa.auth.currentUser
    if(logado){
      this.storage.armazenar_local(this.pizzaModel.Nome,this.pizzaModel);
      //this.storage.lista_local(logado.email);
      this.navCtrl.push(CarrinhoPage);
    }else{
      this.navCtrl.push(LoginPage);
    }

   

  }

  abrir_modal(pizzaSelecionada){
    //console.log(id);
    this.pizzaModel = pizzaSelecionada;
    this.navCtrl.push(ModalPage,{
      pizzaSelecionada: this.pizzaModel

    }); 
  }

  montagem() {
    this.navCtrl.push(MontagemPage);
  }
  telahome(){
    this.navCtrl.setRoot(HomePage);
  }

}
  
  

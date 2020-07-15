import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { PizzaModel } from '../../modelos/modelo_pizza';
import { CarrinhoPage } from '../carrinho/carrinho';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  pizza:PizzaModel;
  
  usuario: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afd:FirebaseProvider,
  public afa: AngularFireAuth, public fp: FirebaseProvider, public storage:StorageProvider ) {
    this.pizza = this.navParams.get('pizzaSelecionada');
    
    
  }

  ionViewDidLoad() {
    
    
  }
  telahome(){
    this.navCtrl.setRoot(HomePage);
  }

  finalizar_pedido(){
    var logado = this.afa.auth.currentUser;
      if(logado){/*
        this.usuario = this.fp.filtrarPorEmail(logado.email);

        
            this.usuario.forEach(user =>{
                for( var i=0;i<user.length;i++){
                 window.open('https://api.whatsapp.com/send?phone=5598999927056&text=Olá,%20gostaria%20de%20uma%20pizza%20sabor%20'+this.pizza.Nome+', no%20endereço%20'+ user[i].endereco+'%20falar com '+user[i].nome+'.','_system')
                }
            }); */
        this.storage.armazenar_local(this.pizza.Nome,this.pizza) 
        this.navCtrl.push(CarrinhoPage);   
        
      }else{
        this.navCtrl.push(LoginPage);
      }
      
  }
  
}

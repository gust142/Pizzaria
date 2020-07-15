import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { List } from 'ionic-angular/components/list/list';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { LocalizacaoProvider } from '../../providers/localizacao/localizacao';
import { PizzaModel } from '../../modelos/modelo_pizza';
import { StorageProvider } from '../../providers/storage/storage';
import { CarrinhoPage } from '../carrinho/carrinho';

/**
 * Generated class for the MontagemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-montagem',
  templateUrl: 'montagem.html',
})
export class MontagemPage {

  imgleft:any = 'assets/imgs/bandeja_left.png'
  imgright:any = 'assets/imgs/bandeja_right.png'
  lista: FirebaseListObservable<any[]>;
  nomes : Array<any>;
  pizza_left: FirebaseListObservable<any[]>;
  pizza_right: FirebaseListObservable<any[]>;
  usuario: FirebaseListObservable<any[]>;
  
  modelo_pizza:PizzaModel
  modelo_left:PizzaModel
  modelo_right:PizzaModel

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    public fp: FirebaseProvider,public afa: AngularFireAuth,public lp:LocalizacaoProvider,
    public storage:StorageProvider,public load:LoadingController) {
      let loading = load.create({
        content: 'Carregando dados...'
      });
      loading.present();
        this.lista = this.fp.getItems();
        this.lista.forEach(item=>{
            this.nomes = item;
        })
        loading.dismiss();
        
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MontagemPage');
  }


  left(){
    //var i  = this.nomes.length;
    let prompt = this.alertCtrl.create();
    prompt.setTitle('Pizzas');
    prompt.setMessage('Selecione o sabor da sua pizza');
    this.lista.forEach(element=>{
        for (var i = 0;  i < this.nomes.length; i++){
        prompt.addInput({
            name:'sabor',
            type:'radio',
            label: element[i].Nome,
            value: element[i].left
       });
    } 
       //console.log(element);
    })
    prompt.addButton({
        text: 'Cancelar',
        handler: data => {
        
        } 
      });
      prompt.addButton({
        text: 'OK',
        handler: (radiobuttonData) => {
          if(radiobuttonData!=null){
            this.imgleft = radiobuttonData;
            
          }
            else{}
        }
      });

    prompt.present();
    
}

right(){
    var i  = this.nomes.length;
    let prompt = this.alertCtrl.create();
    prompt.setTitle('Pizzas');
    prompt.setMessage('Selecione o sabor da sua pizza');
    
    this.lista.forEach(element=>{
        for (var i = 0;  i < this.nomes.length; i++){
        prompt.addInput({
            name:'sabor',
            type:'radio',
            label: element[i].Nome,
            value: element[i].right 
       });
    } 
       //console.log(element);
    })
    prompt.addButton({
        text: 'Cancelar',
        handler: data => {
        
        } 
      });
      prompt.addButton({
        text: 'OK',
        handler: (radiobuttonData) => {
          if(radiobuttonData!=null)
            this.imgright = radiobuttonData
            else{

            }
        }
      });

    prompt.present();
    
}
 

/*
 for(var i=0;i<left.length;i++){
                  if(left[i].Nome == right[i].Nome){
                    window.open('https://api.whatsapp.com/send?phone=5598999927056&text=Olá,%20gostaria%20de%20uma%20pizza%20sabor%20'+right[i].Nome+', no%20endereço%20'+ user[i].endereco+'%20falar com '+user[i].nome+'.','_system')
                  }else{
                    window.open('https://api.whatsapp.com/send?phone=5598999927056&text=Olá,%20gostaria%20de%20uma%20pizza%20metade%20'+right[i].Nome+'%20e%20metade%20'+left[i].Nome+'%20no%20endereço%20'+ user[i].endereco+'.%20Falar com '+user[i].nome+'.','_system')
                  }
                }


                  this.modelo_pizza.Nome = ' + ' + this.pizza_right[i].Nome
                    this.storage.armazenar_local(this.modelo_pizza.Nome,this.modelo_pizza)
                    this.navCtrl.push(CarrinhoPage)
*/

  finalizar_pedido(){
    var logado = this.afa.auth.currentUser;
    if(logado){
      this.usuario = this.fp.filtrarPorUid(logado.uid);
      this.pizza_left = this.fp.filtrarporLeft(this.imgleft); //filtrar por lado esquerdo da pizza
      this.pizza_right = this.fp.filtrarporRight(this.imgright);// filtrar por lado direito da pizza 
      
      this.pizza_left.forEach(left => {
          this.pizza_right.forEach(right => {
            for(var i = 0;i<left.length;i++){
                this.modelo_right = right[i]
                this.modelo_right.Nome += ' + ' + left[i].Nome
                this.modelo_right.url = 'assets/imgs/personalizada.png'
                this.storage.armazenar_local(this.modelo_right.Nome,this.modelo_right)
                this.navCtrl.push(CarrinhoPage)
                
            }
          });
      });
     
      


    }else{
      this.navCtrl.push(LoginPage);
    }
  }



telahome(){
  this.navCtrl.setRoot(HomePage);
}


}

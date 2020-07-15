import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { PizzaModel } from '../../modelos/modelo_pizza';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalizacaoProvider } from '../../providers/localizacao/localizacao';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the CarrinhoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {
  endereco_atual:any
  entrega; pagamento;numero;enderecoa_atual;complemento;email;lista_pizzas:any;
 
  pizza:PizzaModel
 
  usuario: FirebaseListObservable<any[]>;
  //private currentNumber = 1;
  string_pedido: any = ''
  total:number = 0
  constructor(public navCtrl: NavController, public navParams: NavParams, public fp: FirebaseProvider,
  public afa: AngularFireAuth,public geo:Geolocation,public localizacao:LocalizacaoProvider, public toast:ToastController,
  public storage: StorageProvider) {
    
     this.pizza = this.navParams.get('pizzaSelecionada')
    
  }

  private increment (pizza) {
    if(pizza.qtd>=5){

    }else{
        pizza.qtd++;
    }
    
  }
  
  private decrement (pizza) {
    if(pizza.qtd == 1){

    }else{
      pizza.qtd--;
    }
  }
  
  
  ionViewDidLoad() {
    
    var logado = this.afa.auth.currentUser
    if(logado){
      this.lista_pizzas = this.storage.lista_local()
     /* this.lista_pizzas.forEach(element => {
        for(var n = 0;n<element.length;n++){
          this.string_pedido += element[n].Nome+', '
        }
        console.log(this.string_pedido)
      });*/
    
    }

  }

  finalizar_pedido(){
    this.string_pedido = ''
   
    if(this.entrega==null||this.pagamento==null){
        let toast = this.toast.create({
          message: 'Por favor, preencha os campos corretamente e certifique-se que não há campos em branco',
          duration: 3000
        });
        toast.present(); 
      
        
    }else{
      
     var logado = this.afa.auth.currentUser;
      if(logado){
        this.usuario = this.fp.filtrarPorEmail(logado.email);
        
        this.usuario.forEach(user =>{
          this.lista_pizzas.forEach(element => {
            this.total = 0;
            for(var n=0;n<element.length;n++){
            this.string_pedido += element[n].qtd +'%20pizza(s)%20sabor%20'+ element[n].Nome+', '
            this.total+= element[n].qtd*element[n].Preco
            }
          });
            console.log(this.total)
            for( var i=0;i<user.length;i++){
                if(this.entrega == 'endereco'){
                  // se o usuário selecionar a opção de entregar no endereço cadastrado pelo mesmo.
                  if(this.numero==null||this.complemento==null){
                    let toast = this.toast.create({
                      message: 'Por favor, preencha os campos corretamente e certifique-se que não há campos em branco',
                      duration: 3000
                    });
                    toast.present();
                  }else{
                  window.open('https://api.whatsapp.com/send?phone=5598988922270&text=Olá,%20gostaria%20de%20'
                  +this.string_pedido+' no%20endereço%20'+ user[i].endereco+
                  '.%20Número%20da%20casa:%20'+this.numero+'%20'+this.complemento+'.%20Forma%20de%20pagamento:%20'
                  +this.pagamento+'.%20Falar com '+user[i].nome+'.','_system')
                  }
                }
                if(this.entrega == 'localizacao'){
                  // se o usuário selecionar a opção de entregar na localização atual do mesmo.
                  if(this.numero==null||this.complemento==null){
                    let toast = this.toast.create({
                      message: 'Por favor, preencha os campos corretamente e certifique-se que não há campos em branco',
                      duration: 3000
                    });
                    toast.present();
                  }else{
                    this.localizacao.buscar_localizacao_atual(user[0].nome,this.string_pedido,this.numero,this.complemento,this.pagamento)
                  }
                  }
                if(this.entrega == 'pizzaria'){
                  window.open('https://api.whatsapp.com/send?phone=5598988922270&text=Olá,%20gostaria%20de%20'
                  +this.string_pedido+
                  '.Irei%20buscar%20no%20local.%20Forma%20de%20pagamento:%20'
                  +this.pagamento+'.%20Falar com '+user[i].nome+'.','_system')
                }
             }
        }); 
      
      }else{
        this.navCtrl.push(LoginPage);
     }
     console.log(this.entrega)
    }
    
  }
  
   
  remover_pedido(chave){
    this.storage.remover(chave)
    let toast = this.toast.create({
      message: 'Pedido Removido',
      duration: 3000
    });
    toast.present(); 
    this.lista_pizzas = this.storage.lista_local()
    this.lista_pizzas.forEach(element => {
        if(element.length == 0){
          this.navCtrl.pop();
        }
    });

  }


}

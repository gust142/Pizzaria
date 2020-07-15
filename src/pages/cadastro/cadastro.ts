import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  nome:any;
  email:any;
  endereco:any = '';
  senha:any = '';
  csenha:any;

  usuarios: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase,
  public afa:AngularFireAuth, public toast:ToastController) {
      
    this.usuarios = afd.list('/usuario');
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }
  
  cadastro(){
   
      if((this.email !='' && this.senha !='')||(this.senha == this.csenha)){
          
          this.afa.auth.createUserWithEmailAndPassword(this.email,this.senha).then(create => {
            //console.log('funcionou');
             this.afa.auth.signInWithEmailAndPassword(this.email,this.senha).then(auth=>{
                  var logado = this.afa.auth.currentUser
                  this.usuarios.push({
                    nome:this.nome,
                    email:logado.email,
                    endereco:this.endereco,
                    uid:logado.uid
                  })
                  this.navCtrl.setRoot(HomePage)
             })
            
          }).catch(err => { 
            console.log(err)
            let toast = this.toast.create({
              message: 'Ocorreu um erro, preencha as informações corretamente ou tente novamente mais tarde',
              duration: 3000
            });
            toast.present();
             });
             
        
          
      }else{
        let toast = this.toast.create({
          message: 'Informações inválidas, por favor, insira-as corretamente',
          duration: 3000
        });
        toast.present();

      }

      
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule, AUTH_PROVIDERS} from 'angularfire2/auth'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MyApp } from './app.component'; 
import { HomePage } from '../pages/home/home';
import { MapaPageModule } from '../pages/mapa/mapa.module';
import { MapaPage } from '../pages/mapa/mapa';
import { CardapioPageModule } from '../pages/cardapio/cardapio.module';
import { CardapioPage } from '../pages/cardapio/cardapio';
import { PizzasPageModule } from '../pages/pizzas/pizzas.module';
import { PizzasPage } from '../pages/pizzas/pizzas';
import { ModalPageModule } from '../pages/modal/modal.module';
import { ModalPage } from '../pages/modal/modal';
import { UserProvider } from '../providers/user/user';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { MontagemPageModule } from '../pages/montagem/montagem.module';
import { MontagemPage } from '../pages/montagem/montagem';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { CadastroPageModule } from '../pages/cadastro/cadastro.module';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { CarrinhoPageModule } from '../pages/carrinho/carrinho.module';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import {AbsoluteDragDirective } from '../directives/absolute-drag/absolute-drag';
import { WelcomePageModule } from '../pages/welcome/welcome.module';
import { WelcomePage } from '../pages/welcome/welcome';
import{ Geolocation} from '@ionic-native/geolocation';
import { LocalizacaoProvider } from '../providers/localizacao/localizacao';
import { HttpClientModule } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage'
import { StorageProvider } from '../providers/storage/storage';
import { UsuarioPageModule } from '../pages/usuario/usuario.module';
import { UsuarioPage } from '../pages/usuario/usuario';
import { RedefinicaoPageModule } from '../pages/redefinicao/redefinicao.module';
import { RedefinicaoPage } from '../pages/redefinicao/redefinicao';
import { ConcluirCadastroPageModule } from '../pages/concluir-cadastro/concluir-cadastro.module';
import { ConcluirCadastroPage } from '../pages/concluir-cadastro/concluir-cadastro';
import { Facebook } from '@ionic-native/facebook';

    const config = {
      apiKey: "AIzaSyBtV6CzshA117lhT9RmnrrZlHfKeZDuPoM",
      authDomain: "pizzaria-38a06.firebaseapp.com",
      databaseURL: "https://pizzaria-38a06.firebaseio.com",
      projectId: "pizzaria-38a06",
      storageBucket: "pizzaria-38a06.appspot.com",
      messagingSenderId: "761653707495"
    };


@NgModule({
  declarations: [
    MyApp,
    HomePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MapaPageModule,
    CardapioPageModule,
    PizzasPageModule,
    ModalPageModule, 
    AngularFireDatabaseModule,
    MontagemPageModule,
    LoginPageModule,
    AngularFireAuthModule,
    CadastroPageModule,
    CarrinhoPageModule,
    WelcomePageModule,
    HttpClientModule,
    UsuarioPageModule,
    RedefinicaoPageModule,
    ConcluirCadastroPageModule,
    IonicStorageModule.forRoot({
      name: 'Pizzaria',
      storeName:'carrinho',
      driverOrder: ['indexeddb','sqlite', 'websql']
    }), 
    AngularFireModule.initializeApp(config)
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapaPage,
    CardapioPage,
    PizzasPage,
    ModalPage,
    MontagemPage,
    CadastroPage,
    CarrinhoPage,
    LoginPage,
    WelcomePage,
    UsuarioPage,
    ConcluirCadastroPage,
    RedefinicaoPage
  ], 
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    UserProvider,
    FirebaseProvider,
    Geolocation,
    LocalizacaoProvider,
    StorageProvider,
    Facebook
  ]
})
export class AppModule {}

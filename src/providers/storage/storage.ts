
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PizzaModel } from '../../modelos/modelo_pizza';
import { FirebaseListObservable } from 'angularfire2/database';
import { keys } from 'localforage';

import 'rxjs/add/observable/fromPromise'
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
  dados:any
  constructor(public storage: Storage) {
    
  }

  armazenar_local(email,pizza:PizzaModel){
      let chave = email;
      let promise = this.storage.set(email,pizza);
      //console.log(promise);
  }

  lista_local(){

  return  Observable.fromPromise(this.storage.keys().then(keys => Promise.all(keys.map(k => this.storage.get(k))))) 
  }

  remover(chave){
  
    this.storage.remove(chave)

  }


}

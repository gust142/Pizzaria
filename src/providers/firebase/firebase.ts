import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

import { Query } from '@angular/core/src/metadata/di';
import { List } from 'ionic-angular/components/list/list';
import { ToastController, LoadingController } from 'ionic-angular';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  
  constructor(public afd:AngularFireDatabase,public afa: AngularFireAuth, public toast:ToastController) {
    console.log('Hello FirebaseProvider Provider');
  }

  getItems() {
    
    return this.afd.list('/pizza/')
    
  }
  
  filtrarporID(id){
    return this.afd.list('/pizza/',
    { query: {
      orderByKey: true,
      equalTo: id
    }
    }
  );
  //return this.afd.list('/pizza/');
  }
  
  filtrarPorEmail(email){
      return this.afd.list('/usuario/',
      { query: {
        orderByChild: 'email',
        equalTo: email
        
        }
      }
    );

  }
  filtrarPorUid(uid){
    return this.afd.list('/usuario/',
    { query: {
      orderByChild: 'uid',
      equalTo: uid
      
      }
    }
  );

}
  filtrarporRight(right){
    return this.afd.list('/pizza/',
      { query: {
        orderByChild: 'right',
        equalTo: right
        }
      }
    );

  }
  filtrarporLeft(left){
    return this.afd.list('/pizza/',
      { query: {
        orderByChild: 'left',
        equalTo: left
        }
      }
    );

  }

}

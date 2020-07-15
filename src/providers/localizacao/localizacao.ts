import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the LocalizacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalizacaoProvider {
  endereco_atual:any;
  constructor(public http: HttpClient,public geo:Geolocation, public toast:ToastController) {
    console.log('Hello LocalizacaoProvider Provider');
  }

  acharcidade(latitude,longitude){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&key=AIzaSyAh6ZD-mcTNKwNUtGy03YWIK01KSTgwj0M')
    
  }

  buscar_localizacao_atual(nome_usuario,string_pedido,numero,complemento,pagamento){
    this.geo.getCurrentPosition().then((resp) => {
                    
      this.acharcidade(resp.coords.latitude,resp.coords.longitude).subscribe(data => {
          this.endereco_atual = data
           // console.log(JSON.stringify(data))
            window.open('https://api.whatsapp.com/send?phone=5598988922270&text=Olá,%20gostaria%20de%20'+
            string_pedido+' no%20endereço%20'+
            this.endereco_atual.results[0].formatted_address+'.%20Número%20da%20casa:%20'+
            numero+'%20'+complemento+'.%20Forma%20de%20pagamento:%20'+
            pagamento+'.%20Falar%20com%20'+nome_usuario+'.','_system')
          
       });
       
    }).catch((error) => {
      let toast = this.toast.create({
        message: 'Não foi possivel encontrar sua localização, verifique sua conexão de internet',
        duration: 3000
      });
      toast.present();
    });
  }
}
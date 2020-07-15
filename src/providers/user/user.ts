
import { Injectable } from '@angular/core';


let config_key = "dados";
@Injectable()
export class UserProvider {

  private dados = {
      nome: "",
      sobrenome:""

  }

  constructor() {
    
  }

  getdata(): any{
      return localStorage.getItem(config_key);
  }
  setdata(nome?:string,sobrenome?:string){
      let dados = {
        nome:"",
        sobrenome:""

      }
      if(nome){
        dados.nome = nome;
      }
      if(sobrenome){
        dados.sobrenome = sobrenome;
      }

      localStorage.setItem(config_key, JSON.stringify(dados));

  }
}

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
 
@Injectable()
export class RotinaProvider {
 
  constructor(private storage: Storage, private datepipe: DatePipe) { }
 
  public insert(rotina: Rotina) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmm");
    return this.save(key, rotina);
  }
 
  public update(key: string, rotina: Rotina) {
    return this.save(key, rotina);
  }
 
  private save(key: string, rotina: Rotina) {
    return this.storage.set(key, rotina);
  }
 
  public remove(key: string) {
    return this.storage.remove(key);
  }
 
  public getAll() {
 
    let rotinas: RotinaList[] = [];
 
    return this.storage.forEach((value: Rotina, key: string, iterationNumber: Number) => {
      let rotina = new RotinaList();
      rotina.key = key;
      rotina.rotina = value;
      rotinas.push(rotina);
    })
      .then(() => {
        return Promise.resolve(rotinas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}
 
export class Rotina {
  nomeRotina: string;
  descricao: string;
  dataInicio: Date;
  dataFinal: Date;
  horaInicio: Date;
  horaFinal: Date;
}
 
export class RotinaList {
  key: string;
  rotina: Rotina;
}

import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { RotinaProvider, RotinaList } from '../../providers/rotina/rotina';
import { AboutPage } from '../about/about';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rotinas: RotinaList[];

  constructor(public navCtrl: NavController, private rotinaProvider: RotinaProvider,
    private toast: ToastController) { }

  ionViewDidEnter() {
    this.rotinaProvider.getAll()
      .then((result: any) => {
        this.rotinas = result;
      });
  }
  addRotina() {
    this.navCtrl.push(AboutPage);
  }
  editRotina(item: RotinaList) {
    this.navCtrl.push(AboutPage, { key: item.key, rotina: item.rotina });
  }
  removeRotina(item: RotinaList) {
    this.rotinaProvider.remove(item.key)
      .then(() => {
        let index = this.rotinas.indexOf(item);
        this.rotinas.splice(index, 1);
        this.toast.create({ message: 'Rotina removida.', duration: 3000, position: 'botton' }).present();
      })
  }

}

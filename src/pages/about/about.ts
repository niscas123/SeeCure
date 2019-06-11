import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { RotinaProvider, Rotina } from '../../providers/rotina/rotina';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  //photo: string = '';

  model: Rotina;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private rotinaProvider: RotinaProvider, private toast: ToastController /*private camera: Camera*/) {

    if (this.navParams.data.rotina && this.navParams.data.key) {
      this.model = this.navParams.data.rotina;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Rotina();
    }
  }
  homePage() {
    this.navCtrl.push(HomePage);
  }
  save() {
    this.saveRotina()
    if (this.toast.create) {
      this.toast.create({ message: 'Rotina salva.', duration: 3000, position: 'botton' }).present();
      this.navCtrl.pop();
    } else {
      this.toast.create({ message: 'Erro ao salvar a rotina.', duration: 3000, position: 'botton' }).present();
    }
      /*.then((result: any) => {

      })
      .catch((error) => {
        
      });*/
  }
  private saveRotina() {
    if (this.key) {
      return this.rotinaProvider.update(this.key, this.model);
    } else {
      return this.rotinaProvider.insert(this.model);
    }
  }

  /*ionViewDidEnter() {
    this.takePicture();
  }

  public takePicture() {
    this.photo = '';

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.photo = base64image;

      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }*/

}
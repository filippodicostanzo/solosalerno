import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor(public alertCtrl: AlertController) {}

  async presentAlert(header, subHeader, message, buttons) {
    const alert = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      buttons
    });

    await alert.present();
  }
}

import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading = false;

  constructor(private loadingCtrl: LoadingController) {}

  async presentLoading(loadingId: string, loadingMessage?: string) {
    this.isLoading = true;
    return await this.loadingCtrl
      .create({
        id: loadingId,
        message: loadingMessage,
        spinner: 'bubbles',
        cssClass: 'loadingCtrl',
      })
      .then((a) => {
        a.present().then(() => {
          console.log('loading presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort loading'));
          }
        });
      });
  }

  async dismissLoading(loadingId: string) {
    this.isLoading = false;
    return await this.loadingCtrl
      .dismiss(null, null, loadingId)
      .then(() => console.log('loading dismissed'));
  }
}

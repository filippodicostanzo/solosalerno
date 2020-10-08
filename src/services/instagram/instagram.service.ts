import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class InstagramService {
  public data: any = [];

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {
    this.data = [];
  }

  async getData(type: string, id: string, count: number) {
    const apiUrl =
      'https://php.localidautore.it/instagram/index.php?options=' +
      type +
      '&account=' +
      id +
      '&count=' +
      count;

    console.log(this.data);

    if (this.data.length !== 0) {
      return Promise.resolve(this.data);
    } else {
      return new Promise((resolve) => {
        this.loadingService.presentLoading('loadInstagram').then(() => {
          this.http.get(apiUrl).subscribe(
            (data) => {
              this.data = data;
              resolve(data);
              this.loadingService.dismissLoading('loadInstagram');
            },
            (error) => {
              this.loadingService.dismissLoading('loadInstagram');
              this.alertService.presentAlert(
                'Errore',
                '',
                'Si è verificato un errore durante il recupero dei dati',
                ['OK']
              );
              console.log(error);
            }
          );
        });
      });
    }
  }
}

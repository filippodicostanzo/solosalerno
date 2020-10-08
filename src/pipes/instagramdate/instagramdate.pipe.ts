import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instagramdate'
})
export class InstagramdatePipe implements PipeTransform {
  transform(value) {
    const date = new Date(value * 1000);
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
  }
}

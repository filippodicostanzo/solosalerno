import { Pipe, PipeTransform } from '@angular/core';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

@Pipe({
  name: 'matchdate'
})
export class MatchdatePipe implements PipeTransform {

  transform(value){
    const result = format(
        new Date(value),
        'dd/MM');
    return result;
  }

}

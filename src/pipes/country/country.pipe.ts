import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'country'
})
export class CountryPipe implements PipeTransform {

    transform(value: string,): string {
        if (value === 'Bosnia and Herzegovina') {
            return 'Bosnia';
        } else if (value === 'Côte d\'Ivoire') {
            return 'Ivoire';
        } else {
            return value;
        }
    }
}

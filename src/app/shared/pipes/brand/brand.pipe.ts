import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brand'
})
export class BrandPipe implements PipeTransform {

  transform(value:any[], item:string): any {
    return value.filter( brand => brand.name.toLowerCase().includes(item.toLowerCase()) );
  }

}

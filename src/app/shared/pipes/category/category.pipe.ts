import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value:any[], item:string): any {
    return value.filter( cat => cat.name.toLowerCase().includes(item.toLowerCase()) );
  }

}

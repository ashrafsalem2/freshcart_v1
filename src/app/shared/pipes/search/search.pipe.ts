import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value:any[], item:string): any {
    return value.filter( pro => pro.title.toLowerCase().includes(item.toLowerCase()) );
  }

}

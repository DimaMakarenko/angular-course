import { IProduct } from './../models/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(products: IProduct[], search: string): IProduct[] {
    if (search.length === 0) return products;
    return products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  }
}

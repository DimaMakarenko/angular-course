import { IProduct } from './../../models/product';
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})


export class ProductComponent {
  @Input() product: IProduct

  details = false
}

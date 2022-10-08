import { Observable, tap } from 'rxjs';
import { ProductService } from './services/products.service';
import { IProduct } from './models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular app'
  // products: IProduct[] = []
  loading = false
  products$: Observable<IProduct[]>
  term = ''

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.products$ = this.productService.getProducts().pipe(
      tap(() => this.loading = false)
    )

    // this.productService.getProducts().subscribe((products) => {
    //   this.products = products
    //   this.loading = false
    // })

  }
}

import { ModalService } from './services/modal.service';
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
  // products$: Observable<IProduct[]>
  term = ''

  constructor(
    public productService: ProductService,
    public modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loading = true
    // this.products$ = this.productService.getProducts().pipe(
    //   tap(() => this.loading = false)
    // )

    this.productService.getProducts().subscribe(() => {
      this.loading = false
    })

  }
}

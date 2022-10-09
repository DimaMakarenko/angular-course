import { ErrorService } from './error.service';
import { IProduct } from './../models/product';
import { Injectable, } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { catchError, delay, Observable, retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {

  }

  products: IProduct[] = []

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
      params: new HttpParams({
        // fromString: 'limit=5'
        fromObject: {
          limit: 5
        }
      })
    }).pipe(
      delay(200),
      retry(2),
      tap(products => this.products = products),
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }


  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('https://fakestoreapi.com/products', product).pipe(
      tap(response => this.products.push(response))
    )
  }
}

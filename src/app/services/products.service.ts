import { ErrorService } from './error.service';
import { IProduct } from './../models/product';
import { Injectable, } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { catchError, delay, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {

  }

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
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';
import { Catalog } from './catalog';
// import {RequestOptions, Request, Headers } from '@angular/http'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
  'Accept': 'application/json' })
};

 const apiUrl = "http://localhost:4000/api/v1/products";
//const apiUrl = "/api/v1/products";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /* Catalog Data */
  addCatalog(catalog): Observable<Catalog> {
    console.log("Catalog : " +  JSON.stringify(catalog));
    return this.http.post<Catalog>(apiUrl + '/addCatalog', catalog, httpOptions).pipe(
      tap((catalog: Catalog) => console.log(`added Catalog w/ id=${catalog.catalog_id}`)),
      catchError(this.handleError<Catalog>('addedCatalog'))
    );
  }
  getCatalogs():Observable<Catalog[]>{
    return this.http.get<Catalog[]>(apiUrl+'/getCatalogs')
    .pipe(
      tap(x=>console.log(JSON.stringify("fetched catalogs"))),
      catchError(this.handleError('getCatalogs', []))
    );
  }

  /* Product Data */
  getProducts(cid:string): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiUrl}/${cid}`)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${apiUrl+'/edit'}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  addProduct(product): Observable<Product> {
    return this.http.post<Product>(apiUrl + '/add', product, httpOptions).pipe(
      tap((product: Product) => console.log(`added product w/ id=${product._id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct(product): Observable<Product> {
    //const url = `${apiUrl+'/update'}/${id}`;
    return this.http.put(apiUrl+'/update', product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${product._id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct(id): Observable<Product> {
    const url = `${apiUrl+'/delete'}/${id}`;
    return this.http.get<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
    // const url = `${apiUrl+'/delete'}/${id}`;
    // return this.http.get<Product>(url).pipe(
    //   tap(_ => console.log(`fetched product id=${id}`)),
    //   catchError(this.handleError<Product>(`getProduct id=${id}`))
    // );
  }
}

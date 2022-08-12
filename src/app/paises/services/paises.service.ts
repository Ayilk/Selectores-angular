import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = 'https://restcountries.com/v3.1'; 
  //private _regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(): string[]{
    return [...this._regiones];
  }
  constructor(private http: HttpClient) { }

  getPaisesPorRegion( region: string): Observable<PaisSmall[]>{

    const url: string = `${ this.baseUrl}/region/${region}?fields=name,cca3`
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCode( code: string): Observable<Pais[] | null> {

    if( !code){
      return of(null)
    }
    const url = `${this.baseUrl}/alpha/${ code }`;
    return this.http.get<Pais[]>( url );
  }

  getPaisPorCodeSmall( code: string): Observable<PaisSmall[]> {

    const url = `${this.baseUrl}/alpha/${ code }?fields=name,cca3`;
    return this.http.get<PaisSmall[]>( url );
  }

  // getPaisesPorBordes( borders: string[]): Observable<PaisSmall[]>[] {
  //   if ( !borders ) {
  //     return of(null);
  //   }

  //   const peticiones: Observable<PaisSmall[]>[] = [];

  //   borders.forEach( codigo => {
  //     const peticion = this.getPaisPorCodeSmall(codigo);
  //     console.log(peticion)
  //     //peticiones.push( peticion );
  //   });

  //   return combineLatest( peticiones );

  // }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Resa } from '../classes/resa';
import { httpOptions } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class ResaService {

  constructor( private http : HttpClient ) { }

  loadResas( idClient ?: number ): Observable<Resa[]> {
    console.log("chargement des Resas");

    let searchCondition = ""

    if( idClient && idClient > 0 ){
      searchCondition = "?client=" + idClient
    }

    console.log( environment.apiUrl  + "resa"+searchCondition );

    return this.http.get<Resa[]>( environment.apiUrl  + "resa"+searchCondition , httpOptions );
  }

  addResa( Resa : Resa ) : Observable<Resa> {
    return this.http.post<Resa>( environment.apiUrl + "resa" , Resa , httpOptions )
  }

  editResa( Resa : Resa ) : Observable<Resa> {
    return this.http.put<Resa>( environment.apiUrl + "resa/"+Resa.id , Resa , httpOptions )
  }

  deleteResa( id? : number ) : Observable<Resa> {
    return this.http.delete<Resa>( environment.apiUrl + "resa/"+id , httpOptions )
  }

  getResa( id? : number ) : Observable<Resa> {
    return this.http.get<Resa>( environment.apiUrl + "resa/"+id , httpOptions ) // /api/Resa/2 pour la Resa id = 2 
  }
}

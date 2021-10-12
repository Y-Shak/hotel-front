import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../classes/client';
import { httpOptions } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor( private http : HttpClient ) { }
  
  load( search?: String ): Observable<Client[]> {
    let searchCondition = ""

    if( search != undefined && search.length > 0 ){
      searchCondition = "?search="+search; 
    }

    console.log("chargement des Clients");
    return this.http.get<Client[]>( environment.apiUrl  + "client"+searchCondition , httpOptions );
  }

  get( id? : number ) : Observable<Client> {
    return this.http.get<Client>( environment.apiUrl  + "client/"+id , httpOptions );
  }

  add( client : Client ) : Observable<Client> {
    return this.http.post<Client>( environment.apiUrl + "client" , client , httpOptions )
  }

  edit( client : Client ) : Observable<Client> {
    return this.http.put<Client>( environment.apiUrl + "client/"+client.id, client , httpOptions )
  }

  delete( id? : number ) : Observable<any> {
    return this.http.delete( environment.apiUrl + "client/"+id , httpOptions )
  }
}

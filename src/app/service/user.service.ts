import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpOptions } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  authenticate( u : any ){
    return this.http.post<any>( environment.apiUrl + "login" , u , httpOptions )
  }
}

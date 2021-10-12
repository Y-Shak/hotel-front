import { Component, OnInit } from '@angular/core';
import { AuthentificationGuard } from '../authentification.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username : any

  constructor( public guard : AuthentificationGuard) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem( "connectedUser" )
  }

}

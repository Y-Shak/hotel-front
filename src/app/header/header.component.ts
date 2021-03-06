import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationGuard } from '../authentification.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router, public guard : AuthentificationGuard) { }

  ngOnInit(): void {
  }
  onLogout() : void{
    sessionStorage.removeItem( "connectedUser" );
    this.router.navigate(['login'])
 } 

}

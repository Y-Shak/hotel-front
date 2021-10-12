import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error : boolean = false; 

  u = {
    username: "",
    password: ""
  };
  constructor(private us: UserService , private router : Router) { }

  ngOnInit(): void {
  }
  authenticate() {
    this.us.authenticate(this.u).subscribe(
      data => {
        console.log(data)
        if (data.id > 0) {
          sessionStorage.setItem("connectedUser" , data.username ); 
          console.log("redirection");
          this.router.navigate(['home'])
        }else{
          this.error = true; 
        }
      } ,
      error => {
        this.error = true; 
      }
    );
  }

}

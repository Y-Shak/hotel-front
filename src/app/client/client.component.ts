import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../classes/client';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  c : Client = new Client();
  clients : Array<Client> = []; 
  @ViewChild( 'closebutton' ) closebuttonelement: any; 
  success : boolean = false; 
  error : boolean = false; 
  search : String  = "" ; 
  
  constructor(private cs : ClientService) { }

  ngOnInit(): void {
    this.loadClients();
  }
  loadClients():void{
    this.cs.load( this.search , undefined ).subscribe(
      data => { 
        this.clients = data; 
      }
    );
  }
  isAscSorted : Boolean = true;
  loadSortedClients(){
    let typeSorting = ""
    
    if(this.isAscSorted){
      typeSorting = "Asc"
      this.isAscSorted = false
    }else{
      typeSorting = "Desc"
      this.isAscSorted = true
    }
    this.cs.load(undefined,typeSorting).subscribe(
      data => { 
        this.clients = data; 
      }
    );
  }
  submitForm() : void {

    if( this.c.id == undefined ){
      this.cs.add( this.c ).subscribe(
        data => { 
          console.log( data ); 
          this.closebuttonelement.nativeElement.click();
          this.loadClients();
          this.success = true; 
        },error => {
          console.log( error.message )
          this.error = true; 
        }
      )
    }else{
      // try

      this.cs.edit( this.c ).subscribe(
        data => { 
          //console.log( data ); 
          this.closebuttonelement.nativeElement.click();
          this.loadClients();
          this.success = true; 
        },
        // catch si la req echoue 
        error => {
          console.log( error.message )
          this.error = true; 
        }
        
      )
    }
    console.log( this.c ); 
  }

  resetForm(){
    this.error = false;
    this.success = false;
    this.c = new Client();
  }
  edit( id? : number ): void{
    this.cs.get( id ).subscribe(
      data => {
        this.c = data;
        console.log(data);
      } , 
      error => {
        console.log( error )
        this.error = true; 
      }
    );
  }
  delete( id? : number ): void{
    if( confirm( "Êtes vous sur ?" ) ){
      this.cs.delete( id ).subscribe(
        data => { 
          this.loadClients();
          this.success = true; 
        }
      );
    }
  }

}

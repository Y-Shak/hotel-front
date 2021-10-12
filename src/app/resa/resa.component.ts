import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../classes/client';
import { Hotel } from '../classes/hotel';
import { Resa } from '../classes/resa';
import { ClientService } from '../service/client.service';
import { HotelService } from '../service/hotel.service';
import { ResaService } from '../service/resa.service';

@Component({
  selector: 'app-resa',
  templateUrl: './resa.component.html',
  styleUrls: ['./resa.component.scss']
})
export class ResaComponent implements OnInit {

  r: Resa = new Resa()

  resas : Array<Resa> = []
  clients : Array<Client> = []
  hotels : Array<Hotel> = []
  @ViewChild( 'closebutton' ) closebuttonelement: any; 
  success : boolean = false 
  error : boolean = false 
  errorMessage : string = '';
  clientArechercher : number = 0; 
  
  constructor( private rs : ResaService , private clientService: ClientService, private hotelService : HotelService ) { }

  ngOnInit(): void {
    this.loadResa();

    this.clientService.load().subscribe(
      data => {
        this.clients = data
      }
    );
    this.hotelService.loadHotels().subscribe(
      data => {
        this.hotels = data
      }
    )

  }

  loadResa() : void {
    this.rs.loadResas( this.clientArechercher ).subscribe(
      data => {
        this.resas = data; 
      }
    );
  }

  delete( id? : number ){
    if( confirm("Êtes vous sur ?") ){
      this.rs.deleteResa( id ).subscribe(
        data => {
          this.loadResa();
          this.success = true
        },
        error => {
          this.success = false
          this.error = true

          console.log(error)
        }
      );
    }
  }
  edit( id? : number ): void{
    this.rs.getResa( id ).subscribe(
      data => {
        this.r = data;
        console.log(data);
      } , 
      error => {
        console.log( error )
        this.error = true; 
      }
    );
  }
  resetForm(){
    this.error = false;
    this.success = false;
    this.r = new Resa();
  }
  submitForm() : void {

    if( this.r.id == undefined ){
      this.rs.addResa( this.r ).subscribe(
        data => { 
          console.log( data ); 
          this.closebuttonelement.nativeElement.click();
          this.loadResa();
          this.success = true; 
        },error => {
          console.log( error )
          this.errorMessage = error.error.message;
          this.error = true; 
        }
      )
    }else{
      // try

      this.rs.editResa( this.r ).subscribe(
        data => { 
          //console.log( data ); 
          this.closebuttonelement.nativeElement.click();
          this.loadResa();
          this.success = true; 
        },
        // catch si la req echoue 
        error => {
          console.log( error.message )
          this.errorMessage = error.error.message;
          this.error = true; 
        }
        
      )
    }
    console.log( this.r ); 
  }
  checkClient( p1 : Client, p2 : Client ) : boolean{
    return p1 && p2 && p1.id == p2.id; 
  }
  checkHotel( p1 : Hotel, p2 : Hotel ) : boolean{
    return p1 && p2 && p1.id == p2.id; 
  }
}

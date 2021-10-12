import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from '../classes/hotel';
import { HotelService } from '../service/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {


  
  h : Hotel = new Hotel();
  hotels : Array<Hotel> = []; 
  @ViewChild( 'closebutton' ) closebuttonelement: any; 
  success : boolean = false; 
  error : boolean = false;
  errorMessage : string = '';
  search : String  = "" ; 
  constructor(private hs : HotelService) { }

  ngOnInit(): void {
    this.loadHotels();
  }
  loadHotels():void{
    this.hs.loadHotels( this.search ).subscribe(
      data => { 
        this.hotels = data; 
      }
    );
  }
  submitForm() : void {

    if( this.h.id == undefined ){
      this.hs.addHotel( this.h ).subscribe(
        data => { 
          console.log( data ); 
          this.closebuttonelement.nativeElement.click();
          this.loadHotels();
          this.success = true; 
        },error => {
          console.log( error )
          this.errorMessage = error.error.message;
          this.error = true; 
        }
      )
    }else{
      // try

      this.hs.editHotel( this.h ).subscribe(
        data => { 
          //console.log( data ); 
          this.closebuttonelement.nativeElement.click();
          this.loadHotels();
          this.success = true; 
        },
        // catch si la req echoue 
        error => {
          console.log( error.message )
          this.error = true; 
        }
        
      )
    }
    console.log( this.h ); 
  }

  resetForm(){
    this.error = false;
    this.success = false;
    this.h = new Hotel();
  }
  edit( id? : number ): void{
    this.hs.getHotel( id ).subscribe(
      data => {
        this.h = data;
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
      this.hs.deleteHotel( id ).subscribe(
        data => { 
          this.loadHotels();
          this.success = true; 
        }
      );
    }
  }

}

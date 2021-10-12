import { Client } from "./client"
import { Hotel } from "./hotel"

export class Resa {
    // Resa ( id, #client, #hotel , datedeb : Date , datefin : Date, num_chambre )
    id? : number 
    client? : Client
    hotel? : Hotel 
    datedeb? : Date 
    datefin? : Date
    numChambre? : number

    constructor( _id? : number , _client?: Client, _hotel? : Hotel, _numChambre?: number,_datedeb?: Date, _datefin?: Date ){
            this.id = _id
            this.client = _client
            this.hotel = _hotel
            this.numChambre = _numChambre
            this.datedeb = _datedeb
            this.datefin = _datefin
        }
}

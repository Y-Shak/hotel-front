export class Client {
    id? : number;
    nomComplet? : string ; 
    telephone? : string; 
    email? : string ; 
    adresse? : string;
    constructor(_id? : number, _nom_complet? : string , _telephone? : string, _email?: string , _adresse? : string){
       this.id = _id;
       this.nomComplet = _nom_complet;
       this.telephone =_telephone;
       this.email = _email;
       this.adresse = _adresse;
    }
}

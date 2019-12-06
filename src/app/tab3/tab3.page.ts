import { Component } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import {AngularFireStorage} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  datocodificado: any;
  datoscaneado: {};
  shrh = '';
  shrm = '';
  shth = '';
  shtm = '';
  nombre:string;
  categoria:string;
  imagen:string;
  precio:number;
  preciomay:number;
  preciomen:number;
  stock:number;
  ProductoFound;
  Url2;
  constructor(private barcodeScanner: BarcodeScanner,private storage:AngularFireStorage, private db:AngularFirestore) {}

  LeerCode() {
   this.barcodeScanner.scan().then(barcodeData => {
       this.datoscaneado = barcodeData;
//console.log(this.datoscaneado['text']);
       this.db.collection('tennisH').doc(this.datoscaneado['text']).ref.get().then(doc =>{
          this.ProductoFound = doc.data();
          console.log(this.ProductoFound);

          this.storage.ref(this.ProductoFound.Url).getDownloadURL().toPromise().then((url) => {
            this.Url2 = url;

          });

           this.nombre=this.ProductoFound.Nombre;
           this.categoria=this.ProductoFound.Categoria;
           this.precio=this.ProductoFound.Precio;
           this.preciomay=this.ProductoFound.PrecioMay;
           this.preciomen=this.ProductoFound.PrecioMen;
           this.stock=this.ProductoFound.Stock;



       })
     })
     .catch(err => {
       console.log("Error del cod", err);
      });
 }

 CodificarTexto() {
   this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.datocodificado).then(
       encodedData => {
         this.datocodificado = encodedData;
       },
       err => {
         console.log("Un error ha ocurrido: " + err);
       }
     );
 }
}

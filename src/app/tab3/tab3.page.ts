import { Component } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  datocodificado: any;
  datoscaneado: {};

  constructor(private barcodeScanner: BarcodeScanner) {}

  LeerCode() {
   this.barcodeScanner.scan().then(barcodeData => {
       this.datoscaneado = barcodeData;
     })
     .catch(err => {
       console.log("Error", err);
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

import { Component } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { finalize } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  uploadProgress: Observable<number>;
    uploadURL: Observable<string>;
    producto;
    file: any;
    data: any[];
    categoria: string;

    datocodificado: any;

  constructor(private storage:AngularFireStorage, private db:AngularFirestore, private AlerCtrl: AlertController,
  private barcodeScanner: BarcodeScanner) {}

  altaProducto() {
    const randomId = Math.random().toString(36).substring(2, 9);
    const filepath = `images/${randomId}`;
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, this.file);
    this.uploadProgress = task.percentageChanges();
    task.snapshotChanges().pipe(
        finalize(() => this.uploadURL = fileRef.getDownloadURL())
    ).subscribe();
    const name = (document.getElementById('nombre') as HTMLIonInputElement).value;
    const price = parseInt((document.getElementById('precio') as HTMLIonInputElement).value);
    const stock = parseInt((document.getElementById('stock') as HTMLIonInputElement).value);
    const pricemen = parseInt((document.getElementById('precio-men') as HTMLIonInputElement).value);
    const pricemay = parseInt((document.getElementById('precio-may') as HTMLIonInputElement).value);

    this.producto = {Nombre: name, Precio: price, Url: filepath, Stock: stock, PrecioMen: pricemen, PrecioMay: pricemay, Categoria: this.categoria};
    this.db.collection(this.categoria).add(this.producto);
    this.addProduct();
    this.datocodificado = this.producto.Nombre;

    //Generar QR
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.datocodificado).then(
        encodedData => {
          this.datocodificado = encodedData;
        },
        err => {
          console.log("Un error ha ocurrido: " + err);
        }
      );

      console.log(this.datocodificado);
      return {name, ...task};
  }
    showimg(event) {
    this.file = event.target.files[0];
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
      const dataURL = reader.result;
      const img = (document.getElementById('output') as HTMLImageElement);
      if(typeof dataURL === 'string'){
        img.src = dataURL;
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
  selectCategoria() {
    switch (this.categoria) {
      case 'ropam':
        this.categoria = 'ropaM';
        break;
      case 'ropah':
        this.categoria = 'ropaH';
        break;
      case 'tennish':
        this.categoria = 'tennisH';
        break;
      case 'tennism':
        this.categoria = 'tennisM';
        break;
    }
  }
  async addProduct() {
    const alert = await this.AlerCtrl.create({
      message: 'Producto agregado',
      animated: true
    });
    await alert.present();
  }

}

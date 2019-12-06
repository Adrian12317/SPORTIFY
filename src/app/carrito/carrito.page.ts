import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import {Router} from "@angular/router";
import {AlertController, ModalController, PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-carrito',
  templateUrl: 'carrito.page.html',
  styleUrls: ['carrito.page.scss']
})

export class CarritoPage implements OnInit{
  ropaH:any[];
  ropaM:any[];
  tennisH:any[];
  tennisM:any[];
  shrh = '';
  shrm = '';
  shth = '';
  shtm = '';

  cantidad = 0;
  cant=0;
  canti= 1;
  canti1= 1;
  canti2= 1;
  canti3= 1;
  constructor(private storage:AngularFireStorage, private db:AngularFirestore,public router:Router,
  private ModCtrl: ModalController,private Alert: AlertController) {}

  ngOnInit() {
    this.showRopaH();
    this.ShowRopaM();
    this.ShowTennisH();
    this.ShowTennisM();
  }



  showRopaH() {
    this.db.collection('ropaH').snapshotChanges().subscribe(data => {
      this.ropaH = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });

      for (const producto of this.ropaH) {
        console.log(producto.productos.Url);
        this.storage.ref(producto.productos.Url).getDownloadURL().toPromise().then((url) => {
          producto.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }
  ShowRopaM() {
    this.db.collection('ropaM').snapshotChanges().subscribe(data => {
      this.ropaM = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });

      for (const producto of this.ropaM) {

        this.storage.ref(producto.productos.Url).getDownloadURL().toPromise().then((url) => {
          producto.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }
  ShowTennisH() {
    this.db.collection('tennisH').snapshotChanges().subscribe(data => {
      this.tennisH = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });

      for (const tenni of this.tennisH) {

        this.storage.ref(tenni.productos.Url).getDownloadURL().toPromise().then((url) => {
          tenni.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }
  ShowTennisM() {
    this.db.collection('tennisM').snapshotChanges().subscribe(data => {
      this.tennisM = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });

      for (const producto of this.tennisM) {

        this.storage.ref(producto.productos.Url).getDownloadURL().toPromise().then((url) => {
          producto.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }

  search(event) {
    this.shrh = event.detail.value;
    this.shrm = event.detail.value;
    this.shth = event.detail.value;
    this.shtm = event.detail.value;
  }
  recargarpag(event) {

    setTimeout(() => {
      this.showRopaH();
      this.ShowRopaM();
      this.ShowTennisH();
      this.ShowTennisM();
      event.target.complete();
    }, 2000);
  }



  in(nombre, precio, stock) {
    if (stock < this.canti) {
      this.insu();
    } else {
      this.db.collection('carrito').add({
        Nombre: nombre,
        Precio: precio,
        Cantidad: this.canti,
        Total: precio * this.canti
      });
    }
   // console.log(id);
  }
  in1(nombre, precio, stock) {
    if (stock < this.canti1) {
      this.insu();
    } else {
      this.db.collection('carrito').add({
        Nombre: nombre,
        Precio: precio,
        Cantidad: this.canti1,
        Total: precio * this.canti1
      });
    }
    // console.log(id);
  }
  in2(nombre, precio, stock) {
    if (stock < this.canti2) {
      this.insu();
    } else {
      this.db.collection('carrito').add({
        Nombre: nombre,
        Precio: precio,
        Cantidad: this.canti2,
        Total: precio * this.canti2
      });
    }
    // console.log(id);
  }
  in3(nombre, precio, stock) {
    if (stock < this.canti3) {
      this.insu();
    } else {
      this.db.collection('carrito').add({
        Nombre: nombre,
        Precio: precio,
        Cantidad: this.canti3,
        Total: precio * this.canti3
      });
    }
    // console.log(id);
  }
  IrViewCarrito(){
    this.router.navigate(['view-carrito']);
  }
  IrCarrito(){
    this.router.navigate(['carrito']);
  }

  async insu() {
    const alert = await this.Alert.create({
      message:'Productos insuficientes',
      buttons: ['OK'],
    });
    alert.present();
  }
}

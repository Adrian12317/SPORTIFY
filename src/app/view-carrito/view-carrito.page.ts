import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
@Component({
  selector: 'app-view-carrito',
  templateUrl: './view-carrito.page.html',
  styleUrls: ['./view-carrito.page.scss'],
})
export class ViewCarritoPage implements OnInit {
  ventas: any[];
  total = 0;
  prod = 0;
    constructor(private db: AngularFirestore, private AlertCtrl: AlertController,public router:Router) { }

    ngOnInit() {
    this.getcarrito();
    }

    //OBTINE TODOS LO DATOS QUE SE AÑADEN A CARRITO
  getcarrito() {
    this.db.collection('carrito').snapshotChanges().subscribe(data => {
      this.ventas = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });
      //PONEMOS TOTAL EN CANTIDAD Y SUMA EL TOTAL
      for (const producto of this.ventas) {
            this.total += producto.productos.Total;
            this.prod += producto.productos.Cantidad;

          }
      console.log(this.ventas);
    }
    ); }
    //ELIMINAR UN ITEM DEL CARRITO
    eliminarprod(id) {
      this.db.collection('carrito').doc(id).delete();
      this.getcarrito();
    }
    //ELIMINAR TODO EL CARRITO
    async eliminartabla() {
      const alert = await this.AlertCtrl.create({
        message: 'Se borraran todos los productos del carrito, ¿Desea continuar?',
        buttons: [{
          text: 'Cancelar',
          role: 'Cancel',
          handler: blah => {
            console.log('confirm cancel: blah');
        }}, {
            text: 'Aceptar',
            handler: () => {
              this.db.collection('carrito').doc().delete();
            }}]
      });
      alert.present();
    }
    addtable() {

    }

    IrViewCarrito(){
      this.router.navigate(['view-carrito']);
    }
    IrCarrito(){
      this.router.navigate(['carrito']);
    }
  }

import { Component,OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  ropaH:any[];
  ropaM:any[];
  tennisH:any[];
  tennisM:any[];
  constructor(private storage:AngularFireStorage, private db:AngularFirestore) {}

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
      console.log(this.ropaH);
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
      console.log(this.ropaM);
      for (const producto of this.ropaM) {
        console.log(producto.productos.Url);
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
      console.log(this.tennisH);
      for (const tenni of this.tennisH) {
        console.log(tenni.productos.Url);
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
      console.log(this.tennisM);
      for (const producto of this.tennisM) {
        console.log(producto.productos.Url);
        this.storage.ref(producto.productos.Url).getDownloadURL().toPromise().then((url) => {
          producto.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }

  deleterH(id,url){
    this.db.collection('ropaH').doc(id).delete();
    this.storage.ref(url).delete();
   }
  deleterM(id,url){
    this.db.collection('ropaM').doc(id).delete();
    this.storage.ref(url).delete();
   }
  deletetH(id,url){
    this.db.collection('tennisH').doc(id).delete();
    this.storage.ref(url).delete();
   }
  deletetM(id,url){
    this.db.collection('tennisM').doc(id).delete();
    this.storage.ref(url).delete();
   }

}

import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {AlertController} from "@ionic/angular";
import { NavParams } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  nombre: string;
  id: string;
  img: any;
  precio: number;
  preciomen: number;
  preciomay: number;
  stock: number;
  file: any;
  data: any[];
  categoria: string;
  // @input() id: string;
  // @input() nombre: string;
  // @input() img: any;
  // @input() url: string;
  // @input() precio: number;
  // @input() preciomen: number;
  // @input() preciomay: number;
  // @input() stock: number;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private AlCtrl: AlertController,
 private Nav: NavParams,public router:Router) { }

  ngOnInit() {
    this.getdata();
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
  altaProducto() {
    const ref = localStorage.getItem('filepath');
    const filepath = ref;
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, this.file);
    this.uploadProgress = task.percentageChanges();
    task.snapshotChanges().pipe(
        finalize(() => this.uploadURL = fileRef.getDownloadURL())
    ).subscribe();
    this.db.collection(this.categoria).doc(this.id).update({
      Nombre: this.nombre,
      Precio: this.precio,
      Url: filepath,
      Stock: this.stock,
      PrecioMen: this.preciomen,
      PrecioMay: this.preciomay
    });
    this.updateProduct();
    localStorage.clear();
  }
  getdata() {
  this.img= this.Nav.get('img');
  this.precio =  this.Nav.get('precio');
  this.nombre=  this.Nav.get('nombre');
  this.preciomen=  this.Nav.get('preciomen');
  this.preciomay=  this.Nav.get('preciomay');
  this.stock=  this.Nav.get('stock');

  this.id= localStorage.getItem('id');
  }
  async updateProduct() {
    const alert = await this.AlCtrl.create({
      message:'Cliente actualizado',
    });
    await alert.present();
  }

}

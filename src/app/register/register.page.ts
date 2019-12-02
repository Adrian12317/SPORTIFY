import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email:string;
  password:string;
  name:string;

  constructor(public router:Router,private AFauth: AngularFireAuth,private db: AngularFirestore) { }

  ngOnInit() {}

  onSubmitRegister(){
    this.AFauth.auth.createUserWithEmailAndPassword(this.email,this.password).then(user => {
    //  console.log(user.user.uid);
      const uid = user.user.uid;
      this.db.collection('usuarios').doc(uid).set({
        name: this.name,
        uid:uid
      })
      this.router.navigate(['tabs/tab1']);
    }).catch(err => alert('Las credenciales no coinciden o no existe el usuario'));
  }



}

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;
  constructor(public router:Router,private AFauth: AngularFireAuth) { }

  ngOnInit() {}

  onSubmitLogin(){
    this.AFauth.auth.signInWithEmailAndPassword(this.email,this.password).then(user => {
      console.log('simonsisoyauth');
      this.router.navigate(['tabs/tab1']);
    }).catch(err => alert('Las credenciales no coinciden o no existe el usuario'));
  }

  IrRegister(){
      this.router.navigate(['/registrar']);
  }


}

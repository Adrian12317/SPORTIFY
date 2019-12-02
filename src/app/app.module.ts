import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {firebaseConfig} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";

import {AngularFireStorageModule} from "@angular/fire/storage";

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {ModificarPageModule} from "./modificar/modificar.module";
import {RegisterModule} from "./register/register.module";
import {LoginModule} from "./login/login.module";
import {PipesModule} from "./filtro/pipes.module";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(firebaseConfig),AngularFirestoreModule,AngularFireAuthModule, AngularFireStorageModule,
  ModificarPageModule, PipesModule,LoginModule,RegisterModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

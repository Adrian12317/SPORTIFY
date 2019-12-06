import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsCarritoPage } from './tabs-carrito.page';

import { TabsCarritoPageRoutingModule } from './tabs-carrito.router.module';

const routes: Routes = [
  {
    path: '',
    component: TabsCarritoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsCarritoPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsCarritoPage]
})
export class TabsCarritoPageModule {}

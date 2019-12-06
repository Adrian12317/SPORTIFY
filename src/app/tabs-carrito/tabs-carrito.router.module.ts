import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsCarritoPage } from './tabs-carrito.page';


const routes: Routes = [
  {
    path: 'tabs-carrito',
    component: TabsCarritoPage,
    children: [
      {
        path: 'carrito',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../carrito/carrito.module').then(m => m.CarritoModule)
          }
        ]
      },
      {
        path: 'view-carrito',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../view-carrito/view-carrito.module').then(m => m.ViewCarritoPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs-carrito/carrito',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs-carrito/carrito',
    pathMatch: 'full'
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsCarritoPageRoutingModule {}

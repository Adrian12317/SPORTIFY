import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', loadChildren: './login/login.module#LoginModule'},
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'modificar', loadChildren: './modificar/modificar.module#ModificarPageModule' },
  { path: 'registrar', loadChildren: './register/register.module#RegisterModule' },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

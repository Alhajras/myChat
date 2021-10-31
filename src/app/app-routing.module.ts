import { NgModule } from '@angular/core';
import {IsAuthenticatedGuard} from "./guards/is-authenticated.guard";
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'catalog',
    loadChildren: async () => await import('./catalog/catalog/catalog.module').then(m => m.CatalogModule),
  },
    {
    path: 'chat',
    // canActivate: [IsAuthenticatedGuard],
    loadChildren: async () => await import('./chat/chat.module').then(m => m.ChatModule),
  },
      {
    path: 'login',
    loadChildren: async () => await import('./login/login.module').then(m => m.LoginModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

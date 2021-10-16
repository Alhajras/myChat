import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'catalog',
    loadChildren: async () => await import('./catalog/catalog/catalog.module').then(m => m.CatalogModule),
  },
    {
    path: 'chat',
    loadChildren: async () => await import('./chat/chat.module').then(m => m.ChatModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

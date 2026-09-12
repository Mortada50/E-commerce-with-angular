import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shop } from './shop/shop';
import { Home } from './home/home';

const routes: Routes = [
  {path: "", component: Home},
  {path: "shop", component: Shop},
  {path: "**", redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from './nav-bar/nav-bar';
import { AppRoutingModule } from "../app-routing-module";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [NavBar],
  imports: [CommonModule, AppRoutingModule, MatIconModule, MatButtonModule, MatBadgeModule],
  exports: [NavBar],
})
export class CoreModule {}

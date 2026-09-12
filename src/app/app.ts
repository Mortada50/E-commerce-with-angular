import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { IProduct } from './shared/Models/product';
import { IPagnation } from './shared/Models/Pagnation';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit{
  
  constructor(){}

  ngOnInit(): void {
    
  }
  
}

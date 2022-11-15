import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/classes/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

 canAccess(permissions){
  return Auth.canAccess(permissions);
 }
}

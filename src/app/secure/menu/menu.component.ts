import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/classes/auth';
import { permission } from 'src/app/classes/permission';
import { AuthService } from 'src/app/services/auth.service';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public user: User;

  constructor(
    private authService: AuthService,

  ) {}

  ngOnInit(): void {
    console.log(" : ", Auth.userEmitter);
    
  }

 canAccess(){
  
  return Auth.canAccess(permission);
  
 }
}

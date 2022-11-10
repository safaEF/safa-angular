import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces/user';
import {Auth} from '../../classes/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User=null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    Auth.userEmitter.subscribe((user:User) =>{
    
     this.user = this.user;
    
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      console.log('success');
    });
  }
}

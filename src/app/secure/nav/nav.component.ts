import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  
  user = {
    first_name:'',
    last_name:''
  }

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user().subscribe(
      user => {
       console.log("res", user);
        
        this.user = user
      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe((res) => {
      console.log("res logout", res);
      
      localStorage.clear()
    });
  }
}

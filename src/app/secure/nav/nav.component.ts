import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
     this.authService.user().subscribe(
      (user) => {
       console.log("res", user);
        this.user = user
      },
      error => {
         if (error.status == 401) {
            this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.authService.user().subscribe((res) => {
                this.user = res
              },
              )
            },error=> {  this.router.navigate(['/login'])  })
        }
      }
    )
  }

  // logout(): void {
  //   this.authService.logout().subscribe((res) => {
  //     console.log("res logout", res);

  //     localStorage.clear()
  //   });
  // }
  logout() {
    this.authService.logout();
  }
}

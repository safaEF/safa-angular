import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import { Router } from '@angular/router';
import { Auth } from '../classes/auth';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})

export class SecureComponent implements OnInit {
  public user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }


  ngOnInit(): void {
    this.authService.user().subscribe(
      res => {
        // Auth.canAccess()
        Auth.userEmitter.emit(res);
        this.user = res;
        // console.log(res);
        
      },
       error => {
          if (error.status == 401) {
            this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.authService.user().subscribe((res) => {
                this.user = res
                console.log("user : ", this.user);

              })
            },error=> {  this.router.navigate(['/login'])  })
        }
      }

    );
  }

}

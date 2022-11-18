import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Auth} from '../classes/auth';
import {User} from '../interfaces/user';
import { HttpHeaders } from '@angular/common/http';

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
      user => {
        Auth.userEmitter.emit(user);
        Auth.user = user;
        this.user = user;
      },
      error => {
        if (error.error.code == "token_not_valid") {

          this.authService.refresh(localStorage.getItem("refresh_token")).subscribe((res) => {
            console.log("done : ", res)

          },error2=> { console.log("error 2 : ", error2);
          })

        } else {

        }

      }
      //() => this.router.navigate(['/authentification/login'])
    );
  }

}

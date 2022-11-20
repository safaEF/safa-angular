import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Auth} from '../classes/auth';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})

export class SecureComponent implements OnInit {
  public user: User;

  constructor(
    private authService: AuthService,
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

          this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
            localStorage.setItem('access_token', res.access)

          },error2=> { console.log("error 2 : ", error2);
          })

        } else {

        }

      }
      //() => this.router.navigate(['/authentification/login'])
    );
  }

}
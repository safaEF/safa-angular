import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './../public.component.css']
})
export class RegisterComponent implements OnInit {
  firstName = '';
  lastName = '';
  username = '';
  email = '';
  group = '';
  password1 = '';
  password2 = '';
  alert_success: boolean=false
  alert_danger: boolean=false

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.authService.register({
      first_name: this.firstName,
      last_name: this.lastName,
      username: this.username,
      email: this.email,
      password1: this.password1,
      password2: this.password2,
      group: this.group,
    })

    .subscribe(() =>  {
      this.alert_success=true
      setTimeout(()=>this.router.navigate(['/login']),500);

    },

    // else do this
    (error) => {
      this.alert_danger=true

    });

  }

  closeAlert()
  {
   this.alert_success=false
  }
  closeAlertDanger()
  {
   this.alert_danger=false
  }

}

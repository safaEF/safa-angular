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
  password1 = '';
  password2 = '';

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
      is_staff: 0,
      is_superuser: 0,
      groups: null,
      /* role: 1 */
    }).subscribe(() => this.router.navigate(['/login']))


  }

}

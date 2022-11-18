import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css', './../public.component.css']
})

export class LoginComponent implements OnInit {
  alert_success: boolean=false
  alert_danger: boolean=false
  form: FormGroup;
  http: HttpClient;
  jwt : null

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

   submit(): void {

   this.authService.login(this.form.getRawValue())
     .subscribe((res) =>  {
        this.alert_success=true
        localStorage.setItem('access_token', res.access)
        localStorage.setItem('refresh_token', res.refresh)
        setTimeout(()=>this.router.navigate(['/']),500);

      },

      // else do this
      (error) => {
        this.alert_danger=true
      });
      // empty sign in form
      //this.form.reset({})


    }
     // end of function
   closeAlert()
   {
    this.alert_success=false
   }
   closeAlertDanger()
   {
    this.alert_danger=false
   }
  }

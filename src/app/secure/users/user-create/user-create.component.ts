import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RoleService} from '../../../services/role.service';
import {Role} from '../../../interfaces/role';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  form: FormGroup;
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      username: [''],
      email: [''],
      role_id: '',
      password:['']
    }
    );

    this.roleService.all().subscribe(
      roles => this.roles = roles

    );
  }

  submit(): void {
    this.userService.create(this.form.getRawValue()).subscribe(
      () => this.router.navigate(['/users']),
      
      error => {
         if (error.status == 401) {
            this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.userService.create(this.form.getRawValue()).subscribe((res) => {
                this.roles = res
              },
              )
            },error=> {  this.router.navigate(['/login']) })
        }
      }
    );
  }

}

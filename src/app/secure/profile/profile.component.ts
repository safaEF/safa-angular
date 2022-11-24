import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Auth} from '../../classes/auth';
import {Permission} from '../../interfaces/permission';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  permissions: Permission[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const user = Auth.user;
    this.infoForm = this.formBuilder.group({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.groups,
      groups_list: user.groups_list,
      permissions: user.permissions,
      permissions_list: user.permissions_list,

    });

    this.passwordForm = this.formBuilder.group({
      password: '',
      password_confirm: ''
    });

    Auth.userEmitter.subscribe(
      user => {
        this.infoForm.patchValue(user);
      }
    );
  }

  infoSubmit(): void {
    this.authService.updateInfo(this.infoForm.getRawValue()).subscribe(
      user => Auth.userEmitter.emit(user)
    );
  }

  passwordSubmit(): void {
    this.authService.updatePassword(this.passwordForm.getRawValue()).subscribe(
      res => console.log(res)
    );
  }
}

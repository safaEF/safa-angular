import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: User[] = [];
  id: number;
  pageSize = 1;
  page = 10;
 

  sortedData: User[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.all().subscribe(
      res => {
        
        this.users = res.data;
        // this.getUsers();

      },
      error => {
         if (error.status === 401) {
            this.authService.refresh({refresh : localStorage.getItem('refresh_token') }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.userService.all().subscribe((res) => {
                this.users = res;
              },
              );
            }, error => {  this.router.navigate(['/login']);  });
        }
      }
    );
  }


  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.delete(id).subscribe(
        () => {
          this.users = this.users.filter(u => u.id !== id),

          error => {
             if (error.status == 401) {
                this.authService.refresh({refresh : localStorage.getItem('refresh_token') }).subscribe((res) => {
                  localStorage.setItem('access_token', res.access),
                  this.userService.delete(this.id).subscribe(() => {
                    this.users = this.users.filter(u => u.id !== id);
                  },
                  );
                }, error => {  this.router.navigate(['/login']);  });
            }
          };
        }
      );
    }
  }
  getUsers() {
      this.userService.getUsers(this.page, this.pageSize).subscribe(
        data => this.users = data

      )
  }
  onPageChange() {
    this.getUsers();
  }

  // loadPage(page: number) {
  //   if (page !== this.previousPage) {
  //     this.previousPage = page;
  //     this.loadData();
  //   }
  // }
  // loadData() {
  //   this.userService.query({
  //     page: this.page - 1,
  //     size: this.pageSize,
  //   }).subscribe(
  //     (res: Response) => this.onSuccess(res.json(), res.headers),
  //     (res: Response) => this.onError(res.json())
  //     )
  // }

}


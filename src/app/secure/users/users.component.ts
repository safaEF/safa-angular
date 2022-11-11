import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: User[] = [];
  lastPage: number;
  sortedData: User[];

  constructor(private userService: UserService) {
    this.sortedData = this.users.slice();
  }

  ngOnInit(): void {
    this.userService.all().subscribe(
      users => {this.users = users.data
      }
    );
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.delete(id).subscribe(
        () => {
          this.users = this.users.filter(u => u.id !== id);
        }
      );
    }
  }

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        default:
          return 0;
      }
    });

}
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {RoleService} from '../../services/role.service';
import {Role} from '../../interfaces/role';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from 'src/app/classes/auth';



@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {
  roles : Role[] = [];
  id: number;

  displayedColumns: string[] = ['id', 'name', 'row'];
  dataSource!:MatTableDataSource<any>;

  constructor(private authService: AuthService,
    private router: Router,
    private roleService: RoleService) {
  }


 delete(id: number): void {
     if (confirm('Are you sure you want to delete this record?')) {
       this.roleService.delete(id).subscribe(
         () => this.roles = this.roles.filter(r => r.id !== id),

         error => {
            if (error.status == 401) {
               this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
                 localStorage.setItem('access_token', res.access),
                 this.roleService.delete(this.id).subscribe(() => {
                  this.roles = this.roles.filter(r => r.id !== id)
                 },
                 )
               },error=> {  this.router.navigate(['/login'])  })
           }
         }
       );
     }
   }
   canAccess(permissions){
    return Auth.canAccess(permissions)
}

  ngOnInit(): void {
    this.roleService.all().subscribe(
       res => {
        this.roles = res;
         this.dataSource = new MatTableDataSource(this.roles);
         this.dataSource.sort = this.sort;
       },
      error => {
         if (error.status == 401) {
            this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.roleService.all().subscribe((res) => {
                this.roles = res
              },
              )
            },error=> {  this.router.navigate(['/login'])  })
        }
      }
     );
  }

  @ViewChild(MatSort) sort: MatSort;

}
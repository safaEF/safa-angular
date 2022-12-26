import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {RoleService} from '../../services/role.service';
import {Role} from '../../interfaces/role';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private roleService: RoleService,
              private cd: ChangeDetectorRef) {
  }
  roles: Role[] = [];
  pagedRoles = [];
  id: number;



  displayedColumns: string[] = ['id', 'name', 'row'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // dataSource;


 delete(id: number): void {
     if (confirm('Are you sure you want to delete this record?')) {
       this.roleService.delete(id).subscribe(
         () => this.roles = this.roles.filter(r => r.id !== id),

         error => {
            if (error.status === 401) {
               this.authService.refresh({refresh : localStorage.getItem('refresh_token') }).subscribe((res) => {
                 localStorage.setItem('access_token', res.access),
                 this.roleService.delete(this.id).subscribe(() => {
                  this.roles = this.roles.filter(r => r.id !== id);
                 },
                 );
               }, error => {  this.router.navigate(['/login']);  });
           }
         }
       );
     }
   }

  ngOnInit(): void {
    this.roleService.all().subscribe(
       res => {

        // this.refresh ();
        this.roles = res;
        this.dataSource = new MatTableDataSource(res.data);
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
               },
      error => {
         if (error.status === 401) {
            this.authService.refresh({refresh : localStorage.getItem('refresh_token') }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.roleService.all().subscribe((res) => {
                this.roles = res;
              },
              );
            }, error => {  this.router.navigate(['/login']);  });
        }
      }
     );
  }

}

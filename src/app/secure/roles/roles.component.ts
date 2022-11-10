import {Component, OnInit, ViewChild} from '@angular/core';
import {RoleService} from '../../services/role.service';
import {Role} from '../../interfaces/role';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {
  roles : Role[] = [];

  displayedColumns: string[] = ['id', 'name', 'row'];
  dataSource!:MatTableDataSource<any>;

  constructor(private roleService: RoleService) {
  }


 delete(id: number): void {
     if (confirm('Are you sure you want to delete this record?')) {
       this.roleService.delete(id).subscribe(
         () => this.roles = this.roles.filter(r => r.id !== id)
       );
     }
   }

  ngOnInit(): void {
    this.roleService.all().subscribe(
       res => {
        this.roles = res.data
         this.dataSource = new MatTableDataSource(this.roles);
         this.dataSource.sort = this.sort;
       }
     );
  }

  @ViewChild(MatSort) sort: MatSort;

}

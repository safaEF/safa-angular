import {Component, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {ProductService} from '../../services/product.service';
import {Sort} from '@angular/material/sort';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from 'src/app/classes/auth';
import {ExcelService} from '../../services/excel.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  groupData: any;
  data: any = [{
    case_worked: "abc",
    note: "Test",
    id: "1234"
  },
  {
    case_worked: "def",
    note: "test 1",
    id: "1234"
  },
  {
    case_worked: "def",
    note: "Test 2",
    id: "3456"
  }];
  products: Product[] = [];
  id: number;
 /*  lastPage: number; */
  sortedData: Product[];

  constructor(
    private authService: AuthService,
    private excelService:ExcelService,
    private router: Router,
    private productService: ProductService) {

    this.groupData = this.organise(this.products);
    this.sortedData = this.products.slice();
  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.products, 'export-to-excel');
  }

  organise(arr) {
    var headers = [], // an Array to let us lookup indicies by group
      objs = [],    // the Object we want to create
      i, j;
    for (i = 0; i < arr.length; ++i) {
      j = headers.indexOf(arr[i].id); // lookup
      if (j === -1) { // this entry does not exist yet, init
        j = headers.length;
        headers[j] = arr[i].id;
        objs[j] = {};
        objs[j].id = arr[i].id;
        objs[j].data = [];
      }
      objs[j].data.push( // create clone
        {
          case_worked: arr[i].case_worked,
          note: arr[i].note, id: arr[i].id
        }
      );
    }
    return objs;
  }

  ngOnInit(): void {
    this.load();
  }

  load(page = 1): void {
    this.productService.all().subscribe(
      (res) => {

        this.products = res;
      },
      error => {
         if (error.status == 401) {
            this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.productService.all().subscribe((res) => {
                this.products = res
              },
              )
            },error=> {  this.router.navigate(['/login'])  })
        }
      }
      )}
      canAccess(permissions){
        return Auth.canAccess(permissions)
    }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.productService.delete(id)
        .subscribe(() => this.products = this.products.filter(p => p.id !== id),

      error => {
         if (error.status == 401) {
            this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.productService.delete(this.id).subscribe(() => {
                this.products = this.products.filter(p => p.id !== id)
              },
              )
            },error=> {  this.router.navigate(['/login'])  })
        }
      });
    }
  }
  sortData(sort: Sort) {
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        default:
          return 0;
      }
    });

}
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

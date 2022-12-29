import {Component, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {ProductService} from '../../services/product.service';
import {Sort} from '@angular/material/sort';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Auth } from 'src/app/classes/auth';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  id: number;
 /*  lastPage: number; */
  sortedData: Product[];


  constructor(
    private authService: AuthService,
    private router: Router,
    private router2: ActivatedRoute,
    private productService: ProductService,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,) {
    this.sortedData = this.products.slice();
  }

  ngOnInit(): void {


    
    this.load();
    // const breadcrumb =  {dynamicText: 1};
    // this.ngDynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
    
  }
  // updateBreadcrumb(): void {
  //   const breadcrumbs  =  [
  //     {
  //       label : 'products',
  //       url: ''
  //     },
  //     {
  //       label : 'products',
  //       url: '/products'
  //     },
  //     {
  //       label : 'create',
  //       url: ''
  //     },
  //     {
  //       label : 'product/{{id}}',
  //       url: '/products/:id/edit'
  //     },
  //     {
  //       label : 'edit ',
  //       url: ''
  //     },
  //     {
  //       label: 'Update Breadcrumb',
  //       url: ''
  //     }
  //   ];
  //   this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  // }
  getPath() :void{
    this.router2.queryParams
    .subscribe(params => {
      console.log("path : ",params); // { orderby: "price" }
    }
    )
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

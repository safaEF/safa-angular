import {Component, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {ProductService} from '../../services/product.service';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  lastPage: number;
  sortedData: Product[];

  constructor(private productService: ProductService) {
    this.sortedData = this.products.slice();
  }

  ngOnInit(): void {
    this.load();
  }

  load(page = 1): void {
    this.productService.all().subscribe(
      res => {
        console.log(res);

        this.products = res.data;
        this.lastPage = res.meta.last_page;
      }
    );
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.productService.delete(id)
        .subscribe(() => this.products = this.products.filter(p => p.id !== id));
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

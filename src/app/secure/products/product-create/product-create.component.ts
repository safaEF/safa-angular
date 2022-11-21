import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      image: '',
      price: ''
    });
  }

  submit(): void {
    this.productService.create(this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/products']),
      
      error => {
         if (error.status == 401) {
            this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.productService.create(this.form.getRawValue()).subscribe(() => this.router.navigate(['/products']),
              )
            },error=> {this.router.navigate(['/login'])})
        }
      });
  }
}

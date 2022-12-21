import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { title } from 'process';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;
  image: ''

  

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private imageService: ImageService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      price: ''
    });
  }


  submit(): void {
    let formData = new FormData();
    formData.set('title',  this.form.get('title').value),
    formData.set('description',  this.form.get('description').value),
    formData.set('price',  this.form.get('price').value),
    formData.set('image', this.image)

    this.productService.create(formData)
      .subscribe(() => this.router.navigate(['/products']),
      
      error => {
         if (error.status == 401) {
            this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.productService.create(formData).subscribe(() => this.router.navigate(['/products']),
              )
            },error=> {this.router.navigate(['/login'])})
        }
      });
  }
  upload(event: any) {
    this.image = event.target.files[0]
  }
}
  
 

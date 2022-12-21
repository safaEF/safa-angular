import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  image: ''

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private imageService: ImageService,
  ) {
  }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      price: '',
      image: ''
    });


    this.id = this.route.snapshot.params.id;

    this.productService.get(this.id).subscribe(
      product => this.form.patchValue(product),
    );
  }

  submit(): void {

    let formData = new FormData();
    formData.set('title',  this.form.get('title').value)
    formData.set('description',  this.form.get('description').value)
    formData.set('price',  this.form.get('price').value)
    formData.set('image', this.image)

    let data = null
    let formdata = {title: '', description: '', price: ''}
    if (this.image == null)
    {
      formdata.title = this.form.get('title').value
      formdata.description = this.form.get('description').value
      formdata.price = this.form.get('price').value
      data = formdata
    }
    else{
      data = formData
    }

    this.productService.update2(this.id, data)

      .subscribe(() => this.router.navigate(['/products']),
      
      error => {
         if (error.status == 401) {
            this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.productService.update(this.id, formData).subscribe(() => this.router.navigate(['/products']),
              )
            },error=> {  this.router.navigate(['/login'])  })
        }
      });
  }
  upload(event: any) {
    this.image = event.target.files[0]
  }
  
}

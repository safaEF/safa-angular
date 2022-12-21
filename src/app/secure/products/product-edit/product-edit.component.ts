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
      // image: '',
      price: ''
    });

    this.id = this.route.snapshot.params.id;

    this.productService.get(this.id).subscribe(
      product => this.form.patchValue(product)
    );
  }

  submit(): void {
    this.productService.update2(this.id, this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/products']),
      
      error => {
         if (error.status == 401) {
            this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.productService.update(this.id, this.form.getRawValue()).subscribe(() => this.router.navigate(['/products']),
              )
            },error=> {  this.router.navigate(['/login'])  })
        }
      });
  }
    upload(files: FileList): void {
      
      const file = files.item(0);

      const data = new FormData();
      data.append('image', file);
      
      this.imageService.upload2(data).subscribe((res:any) => {
        this.id = res.data.id
          }
          
        );
    }
  
}

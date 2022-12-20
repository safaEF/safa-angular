import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;
  @Output('fileUpload') fileUploadEmitter = new EventEmitter<string>();
  id= null

  

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
    this.productService.update2(this.id, this.form.getRawValue())
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
  upload(files: FileList): void {
    const file = files.item(0);

    const data = new FormData();
    data.append('image', file);
    
    this.imageService.upload(data).subscribe((res:any) => {
      this.id = res.data.id
        }
        
      );
  }
}
  
 

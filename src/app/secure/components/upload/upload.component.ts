import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Output('fileUpload') fileUploadEmitter = new EventEmitter<string>();

  constructor(private http: HttpClient,
    private imageService: ImageService) {
  }

  ngOnInit(): void {
  }

  upload(files: FileList): void {
    const file = files.item(0);

    const data = new FormData();
    data.append('image', file);
    
    this.imageService.upload(data).subscribe((res: any) => {
      this.fileUploadEmitter.emit(res.url)
        }
        
      );
  }
}

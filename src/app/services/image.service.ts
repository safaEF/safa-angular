import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  upload(data){
    return this.http.post(`${environment.api}/upload/`, data);
}
  upload2(data){
    return this.http.patch(`${environment.api}/upload/`, data);
  }
}

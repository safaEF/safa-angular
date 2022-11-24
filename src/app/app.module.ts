import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SecureModule} from './secure/secure.module';
import {PublicModule} from './public/public.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CredentialInterceptor} from './interceptors/credential.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SecureModule,
    PublicModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MatTableModule,
    MatSelectModule,
   
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialInterceptor,
      multi: true,

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

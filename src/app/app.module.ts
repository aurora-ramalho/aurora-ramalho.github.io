import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService } from './api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { SafePipe } from './safe.pipe'

@NgModule({
  declarations: [
    AppComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

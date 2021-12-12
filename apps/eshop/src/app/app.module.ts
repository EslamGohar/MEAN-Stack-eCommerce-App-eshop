import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@bluebits/products';
import { UiModule } from '@bluebits/ui';
import { OrdersModule } from '@bluebits/orders';
import { JwtInterceptor, UsersModule } from '@bluebits/users';

import { ToastModule } from 'primeng/toast';
import { MessagesComponent } from './shared/messages/messages.component';
import { MessageService } from 'primeng/api';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// payment service
import { NgxStripeModule } from 'ngx-stripe';

const routes: Routes = [ { path:'', component: HomePageComponent } ]

@NgModule({
  declarations: [
    AppComponent, 
    HomePageComponent, 
    HeaderComponent, 
    FooterComponent, 
    NavComponent, 
    MessagesComponent
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UiModule,
    ProductsModule,
    OrdersModule,
    ToastModule,
    UsersModule,
    NgxStripeModule.forRoot('pk_test_51K4o0qKBAyYBGP1F9n4OIp2UI7hN4WKVctWNLqYm7HPUnKlVckhBWpTRMrwsPMkVVaeaszsnEWZznlu1cRntghqZ00H3lvJuph')
  ],
  providers: [MessageService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ],
  bootstrap: [AppComponent],
  exports: [MessagesComponent],
})
export class AppModule {}

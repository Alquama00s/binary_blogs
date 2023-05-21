import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';


import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain:'dev-jpwmi4c6wfbzcog1.us.auth0.com',
      clientId:'UfNFT7r7BCxGiRcqdOVjknypNRpe6klo',
      authorizationParams:{
        redirect_uri:window.location.origin
      }

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

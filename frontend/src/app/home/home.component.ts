import { Component, Renderer2 } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
constructor(private renderer:Renderer2,private cookieService:CookieService){

}

isLoggedIn():boolean{
  return this.cookieService.get('session') != undefined 
}

login() {
  console.log("logging in")
  window.location.href = 'http://localhost:8000/api/auth/login';
}

logout() {
  console.log("logging out")
  this.cookieService.remove("session")
  window.location.href = 'http://localhost:8000/api/auth/logout';
}

}

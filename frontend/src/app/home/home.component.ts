import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
constructor(private renderer:Renderer2){

}

login() {
  console.log("logging in")
  window.location.href = '/api/auth/login';
}

logout() {
  console.log("logging out")
  window.location.href = '/api/auth/logout';
}

}

import { Component, Renderer2 } from '@angular/core';
import { User } from '../models/user.model';
import { BackendService } from '../services/backend.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
constructor(private renderer:Renderer2,private backendService:BackendService){
  backendService.getUser().subscribe((data:User)=>
  this.user = data
  )
}

user:User|null=null

isLoggedIn():boolean{
  return this.user !=null
}

login() {
  this.backendService.login()
}

logout() {
  this.backendService.logout()
}

}

import { Component, Renderer2 } from '@angular/core';
import { User } from '../models/user.model';
import { BackendService } from '../services/backend.service';
import { Blog } from '../models/blog.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
constructor(private renderer:Renderer2,private backendService:BackendService){
  if(this.user==null){
  backendService.getUser().subscribe((data:User)=>
  this.user = data
  )}

  if(this.blogs.length==0){
    backendService.getUserBlogs().subscribe(
      (data:Array<Blog>)=>{
        console.log(data)
        return this.blogs = data;
      }
    )
  }
}

user:User|null=null
blogs:Array<Blog> =[]


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

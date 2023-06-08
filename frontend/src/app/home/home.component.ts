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


  if(this.blogs.length==0){
    this.searchBlog()
  }
}

searchTerm:string=""
searchPage:Number=1
pages:Array<Number> =[]
blogs:Array<Blog> =[]

getUser():User|null{
  return this.backendService.user
}

searchBlog(){
  this.backendService.searchBlogs(this.searchTerm,this.searchPage.toString()).subscribe((data:Array<Blog>)=>{
    this.blogs=data
  this.pages=Array.from({ length: this.backendService.pageCount }, (_, index) => index + 1)
  console.log(this.backendService.pageCount)


  })
}

goToPage(pageNumber:Number){
  this.searchPage=pageNumber
  this.searchBlog()
}

resetSearch(){
  this.pages=[]
  this.searchPage=1
  this.searchBlog()
}

isLoggedIn():boolean{
  return this.backendService.user !=null
}

login() {
  this.backendService.login()
}

logout() {
  this.backendService.logout()
}

}

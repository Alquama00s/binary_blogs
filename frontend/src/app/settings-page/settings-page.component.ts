import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { BackendService } from '../services/backend.service';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.less']
})
export class SettingsPageComponent {
  constructor(private backendService:BackendService){
    backendService.getUserBlogs().subscribe((resp:Array<Blog>)=>{this.blogs=resp})
  }

  name:string=""
  userName:string=""
  edit:boolean=false

  

blogs:Array<Blog> =[]
searchTerm:string=""
searchPage:Number=1
pages:Array<Number> =[]


  
  toggleEdit(){
    this.name=this.backendService.user?.name??""
  this.userName=this.backendService.user?.username??""
    this.edit=!this.edit
  }

  updateUser(){
    this.backendService.updateUser(this.name,this.userName).subscribe(
      (resp)=>{
        this.toggleEdit()
        this.backendService.refreshUser()
      }
    )
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
  getUser():User|null{
    return this.backendService.user
  }
}

import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.less']
})
export class CreateBlogComponent {

  constructor(private backendService:BackendService,private router:Router){}

  public title:string=""
  public description:string=""
  public content:string=""

  submit():void{
    this.backendService.addBlog(this.title,this.description,this.content).subscribe(
      resp=>{
        console.log(resp)
        this.router.navigate(['/'])
      },
      err=>{console.log(err)}
    )
  }
}

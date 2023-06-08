import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.less']
})
export class CreateBlogComponent {

  constructor(private backendService:BackendService){}

  public title:string=""
  public description:string=""
  public content:string=""

  submit():void{
    this.backendService.addBlog(this.title,this.description,this.content).subscribe(
      resp=>{
        console.log(resp)
      },
      err=>{console.log(err)}
    )
  }
}

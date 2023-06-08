import { Component, Input } from '@angular/core';
import { Blog } from '../models/blog.model';
import { BackendService } from '../services/backend.service';
@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.less']
})
export class BlogViewComponent {

  constructor(private backendService:BackendService){}

  @Input() blog!:Blog
  @Input() author:boolean=false

  deleteBlog(){
    this.backendService.deleteBlog(this.blog.id).subscribe(
      resp=>{
        window.location.reload()
      },
    )
  }
}

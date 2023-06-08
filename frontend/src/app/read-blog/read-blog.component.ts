import { Component, Input } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Blog } from '../models/blog.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-read-blog',
  templateUrl: './read-blog.component.html',
  styleUrls: ['./read-blog.component.less']
})
export class ReadBlogComponent {
  constructor(private backendService:BackendService,private route:ActivatedRoute){
    this.blogId=this.route.snapshot.params['id']
    backendService.getBlogbyId(this.blogId).subscribe((data:Blog)=>this.blog=data)


  }
  blogId:string=""
blog:Blog|null=null
}

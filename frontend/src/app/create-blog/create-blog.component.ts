import { Component, Input } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { Blog } from '../models/blog.model';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.less']
})
export class CreateBlogComponent {

  constructor(private backendService:BackendService,private router:Router,private route:ActivatedRoute){
    if(this.isUpdate()){
      backendService.getBlogbyId(route.snapshot.queryParams['blogid']).subscribe((resp:Blog)=>{
        this.title=resp.title,
        this.description=resp.description
        this.content=resp.content
        this.tags=resp.tags?resp.tags:[]
      })
    }
  }

  public title:string=""
  public description:string=""
  public content:string=""
  public tag:string=""
  public tags:Array<string> =[]


  isUpdate(){
    return this.route.snapshot.queryParams['blogid']!=undefined
  }

  addTag(){
    if(this.tag.trim().length!=0){
      this.tags.push(this.tag.trim().toString())
      this.tag=""
    }
  }

  removeTag(tag:string){
    this.tags=this.tags.filter((e)=>e!==tag)
  }

  submit():void{
    if(this.isUpdate()){
      this.backendService.updateBlog(this.title,this.description,this.content,this.tags,this.route.snapshot.queryParams['blogid']).subscribe(
        resp=>{
          console.log(resp)
          this.router.navigate(['/'])
        },
        err=>{console.log(err)}
      )
    }else{
    this.backendService.addBlog(this.title,this.description,this.content,this.tags).subscribe(
      resp=>{
        console.log(resp)
        this.router.navigate(['/'])
      },
      err=>{console.log(err)}
    )
  }
}
}

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { BACKEND_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { Blog } from '../models/blog.model';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient,private cookieService:CookieService) {
    this.token=this.cookieService.get('token')??""
    this.fetchUser().subscribe((data:User)=>
    this.user= data
    )
    
   }
  private token:string=''
  user:User|null=null
  pageCount=0
  fetchUser():Observable<User>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<User>(BACKEND_URL+"/api/user/current-user",{headers})
    
  }

  searchBlogs(searchTerm:string,page:string):Observable<Array<Blog>>{
    let params=new HttpParams().set('search',searchTerm).set('page',page )
    return this.http.get(BACKEND_URL+"/api/blog/public-blogs",{params}).pipe<Array<Blog>>(map((resp:any)=>{
      console.log(resp.count)
      this.pageCount=Math.ceil(resp.count/4)
      return resp.results
    }))
  }

  addBlog(title:string,description:string,content:string):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(BACKEND_URL+"/api/blog/user-blogs",{
      "title":title,
      "description":description,
      "content":content
    },{headers})
  }

  getUserBlogs():Observable<Array<Blog>>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Array<Blog>>(BACKEND_URL+"/api/blog/user-blogs",{headers})
  }

  getBlogbyId(id:string):Observable<Blog>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Blog>(BACKEND_URL+"/api/blog/public-blog/"+id,{headers})
  }

  login() {
    console.log("logging in")
    window.location.href = 'http://localhost:8000/api/auth/login';
  }
  
  logout() {
    console.log("logging out")
    this.cookieService.removeAll()
    window.location.href = 'http://localhost:8000/api/auth/logout';
  }
}

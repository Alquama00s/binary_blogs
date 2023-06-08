import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { BACKEND_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { Blog } from '../models/blog.model';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient,private cookieService:CookieService) {
    this.token=this.cookieService.get('token')??""
    // cookieService.removeAll()
   }
  private token:string=''
  getUser():Observable<User>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<User>(BACKEND_URL+"/api/user/get-user",{headers})
    
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ReadBlogComponent } from './read-blog/read-blog.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
const routes: Routes = [
  {
    path:'',component:HomeComponent,
   
  },
  {
    path:'create-blog',component:CreateBlogComponent,
   
  },
  {
    path:'read-blog/:id',component:ReadBlogComponent
  },
  {
    path:'profile',component:SettingsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, Input } from '@angular/core';
import { Blog } from '../models/blog.model';
@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.less']
})
export class BlogViewComponent {
  @Input() blog!:Blog
}

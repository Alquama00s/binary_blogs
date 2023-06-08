import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogViewComponent } from './blog-view.component';

describe('BlogViewComponent', () => {
  let component: BlogViewComponent;
  let fixture: ComponentFixture<BlogViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogViewComponent]
    });
    fixture = TestBed.createComponent(BlogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

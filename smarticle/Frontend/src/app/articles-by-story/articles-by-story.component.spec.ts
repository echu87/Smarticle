import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesByStoryComponent } from './articles-by-story.component';

describe('ArticlesByStoryComponent', () => {
  let component: ArticlesByStoryComponent;
  let fixture: ComponentFixture<ArticlesByStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesByStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesByStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

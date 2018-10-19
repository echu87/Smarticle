import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesBySourceComponent } from './articles-by-source.component';

describe('ArticlesBySourceComponent', () => {
  let component: ArticlesBySourceComponent;
  let fixture: ComponentFixture<ArticlesBySourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesBySourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesBySourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

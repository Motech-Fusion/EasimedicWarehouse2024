import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemV2Component } from './post-item-v2.component';

describe('PostItemV2Component', () => {
  let component: PostItemV2Component;
  let fixture: ComponentFixture<PostItemV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostItemV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostItemV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

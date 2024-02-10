import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialViewerComponent } from './tutorial-viewer.component';

describe('TutorialViewerComponent', () => {
  let component: TutorialViewerComponent;
  let fixture: ComponentFixture<TutorialViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutorialViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

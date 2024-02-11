import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationShowComponent } from './notification-show.component';

describe('NotificationShowComponent', () => {
  let component: NotificationShowComponent;
  let fixture: ComponentFixture<NotificationShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

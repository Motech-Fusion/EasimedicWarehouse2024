import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUserItemComponent } from './doctor-user-item.component';

describe('DoctorUserItemComponent', () => {
  let component: DoctorUserItemComponent;
  let fixture: ComponentFixture<DoctorUserItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorUserItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

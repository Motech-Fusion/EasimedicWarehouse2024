import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowTruckUserItemComponent } from './tow-truck-user-item.component';

describe('TowTruckUserItemComponent', () => {
  let component: TowTruckUserItemComponent;
  let fixture: ComponentFixture<TowTruckUserItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TowTruckUserItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TowTruckUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

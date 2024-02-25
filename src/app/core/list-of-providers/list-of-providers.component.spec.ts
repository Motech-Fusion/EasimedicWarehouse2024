import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfProvidersComponent } from './list-of-providers.component';

describe('ListOfProvidersComponent', () => {
  let component: ListOfProvidersComponent;
  let fixture: ComponentFixture<ListOfProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfProvidersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

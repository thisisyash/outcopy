import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSlotsComponent } from './manage-slots.component';

describe('ManageSlotsComponent', () => {
  let component: ManageSlotsComponent;
  let fixture: ComponentFixture<ManageSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

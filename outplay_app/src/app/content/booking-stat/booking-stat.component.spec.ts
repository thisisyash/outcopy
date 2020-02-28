import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStatComponent } from './booking-stat.component';

describe('BookingStatComponent', () => {
  let component: BookingStatComponent;
  let fixture: ComponentFixture<BookingStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

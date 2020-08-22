import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalOrderComponent } from './total-order.component';

describe('TotalOrderComponent', () => {
  let component: TotalOrderComponent;
  let fixture: ComponentFixture<TotalOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

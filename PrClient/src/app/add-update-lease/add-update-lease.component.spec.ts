import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateLeaseComponent } from './add-update-lease.component';

describe('AddUpdateLeaseComponent', () => {
  let component: AddUpdateLeaseComponent;
  let fixture: ComponentFixture<AddUpdateLeaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateLeaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

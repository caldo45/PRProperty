import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNextOfKinComponent } from './add-next-of-kin.component';

describe('AddNextOfKinComponent', () => {
  let component: AddNextOfKinComponent;
  let fixture: ComponentFixture<AddNextOfKinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNextOfKinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNextOfKinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

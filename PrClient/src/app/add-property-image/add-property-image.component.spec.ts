import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyImageComponent } from './add-property-image.component';

describe('AddPropertyImageComponent', () => {
  let component: AddPropertyImageComponent;
  let fixture: ComponentFixture<AddPropertyImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

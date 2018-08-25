import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientPhotoComponent } from './add-client-photo.component';

describe('AddClientPhotoComponent', () => {
  let component: AddClientPhotoComponent;
  let fixture: ComponentFixture<AddClientPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

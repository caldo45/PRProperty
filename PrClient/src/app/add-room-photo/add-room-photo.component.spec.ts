import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomPhotoComponent } from './add-room-photo.component';

describe('AddRoomPhotoComponent', () => {
  let component: AddRoomPhotoComponent;
  let fixture: ComponentFixture<AddRoomPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoomPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

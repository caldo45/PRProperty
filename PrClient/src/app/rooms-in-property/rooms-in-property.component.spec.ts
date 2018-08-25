import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsInPropertyComponent } from './rooms-in-property.component';

describe('RoomsInPropertyComponent', () => {
  let component: RoomsInPropertyComponent;
  let fixture: ComponentFixture<RoomsInPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsInPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsInPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

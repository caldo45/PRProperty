import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasesInPropertyComponent } from './leases-in-property.component';

describe('LeasesInPropertyComponent', () => {
  let component: LeasesInPropertyComponent;
  let fixture: ComponentFixture<LeasesInPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasesInPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasesInPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

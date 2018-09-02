import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractNotificationsComponent } from './contract-notifications.component';

describe('ContractNotificationsComponent', () => {
  let component: ContractNotificationsComponent;
  let fixture: ComponentFixture<ContractNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanDeactivateGuardComponent } from './can-deactivate-guard.component';

describe('CanDeactivateGuardComponent', () => {
  let component: CanDeactivateGuardComponent;
  let fixture: ComponentFixture<CanDeactivateGuardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanDeactivateGuardComponent]
    });
    fixture = TestBed.createComponent(CanDeactivateGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

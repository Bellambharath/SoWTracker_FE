import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningEditComponent } from './screening-edit.component';

describe('ScreeningEditComponent', () => {
  let component: ScreeningEditComponent;
  let fixture: ComponentFixture<ScreeningEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreeningEditComponent]
    });
    fixture = TestBed.createComponent(ScreeningEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

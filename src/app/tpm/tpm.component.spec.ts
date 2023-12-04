import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TPMComponent } from './tpm.component';

describe('TPMComponent', () => {
  let component: TPMComponent;
  let fixture: ComponentFixture<TPMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TPMComponent]
    });
    fixture = TestBed.createComponent(TPMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

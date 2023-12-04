import { TestBed } from '@angular/core/testing';

import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('CanDeactivateGuardService', () => {
  let service: CanDeactivateGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanDeactivateGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('canDeactivate', () => {
    const component = {
      canExit: jasmine.createSpy('canExit')
    };
    const currentRoute = {} as ActivatedRouteSnapshot;
    const currentState = {} as RouterStateSnapshot;
    const nextState = {} as RouterStateSnapshot;
    service.canDeactivate(component, currentRoute, currentState, nextState);
    expect(component.canExit).toHaveBeenCalled();
  });
});

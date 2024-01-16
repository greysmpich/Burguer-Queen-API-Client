import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationServiceService } from './services/authentication/authentication-service.service';
import { ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Router } from '@angular/router';


class ParamMapImpl implements ParamMap {
  get(key: string): string | null {
    return null;
  }

  getAll(key: string): string[] {
    return [];
  }

  has(key: string): boolean {
    return false;
  }

  get keys(): string[] {
    return [];
  }
}

const routeSnapshotMock: ActivatedRouteSnapshot = {
  url: [new UrlSegment('dummy', {})],
  params: {},
  queryParams: {},
  fragment: '',
  data: { allowedRoles: ['userRole'] },
  outlet: '',
  component: undefined!,
  routeConfig: undefined!,
  root: undefined!,
  parent: undefined!,
  firstChild: undefined!,
  children: [],
  pathFromRoot: [],
  paramMap: new ParamMapImpl(),
  queryParamMap: new ParamMapImpl(),
};

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: AuthenticationServiceService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthenticationServiceService]
    });
    service = TestBed.inject(AuthenticationServiceService);
    router = TestBed.inject(Router)
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation for user with allowed role', () => {
    spyOn(service, 'getUserRole').and.returnValue('userRole');
    const routeSnapshotMock: ActivatedRouteSnapshot = {
      url: [new UrlSegment('dummy', {})],
      params: {},
      queryParams: {},
      fragment: '',
      data: { allowedRoles: ['userRole'] },
      outlet: '',
      component: undefined!,
      routeConfig: undefined!,
      root: undefined!,
      parent: undefined!,
      firstChild: undefined!,
      children: [],
      pathFromRoot: [],
      paramMap: new ParamMapImpl(),
      queryParamMap: new ParamMapImpl(),
    };
    const canActivate = guard.canActivate(routeSnapshotMock);

    expect(canActivate).toBeTruthy();
  });

  it('should not allow activation for user without a role', () => {
    spyOn(service, 'getUserRole').and.returnValue(null);
    spyOn(router, 'navigate');
    expect(guard.canActivate(routeSnapshotMock)).toBeFalsy();
  });
});
 
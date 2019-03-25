export class RestangularStub {
  constructor() {}

  one = jasmine.createSpy('one').and.returnValue(this);
  all = jasmine.createSpy('all').and.returnValue(this);
  post = jasmine.createSpy('post');
  get = jasmine.createSpy('get');
  getList = jasmine.createSpy('getList');
  remove = jasmine.createSpy('remove');
  customPUT = jasmine.createSpy('customPUT');
}

import { NgAuthPage } from './app.po';

describe('ng-auth App', () => {
  let page: NgAuthPage;

  beforeEach(() => {
    page = new NgAuthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

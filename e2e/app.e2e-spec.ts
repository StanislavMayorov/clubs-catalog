import { ClubsCatalogPage } from './app.po';

describe('clubs-catalog App', () => {
  let page: ClubsCatalogPage;

  beforeEach(() => {
    page = new ClubsCatalogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

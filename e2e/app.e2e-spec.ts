import { TournamentGridPage } from './app.po';

describe('tournament-grid App', function() {
  let page: TournamentGridPage;

  beforeEach(() => {
    page = new TournamentGridPage();
  });

  it('should display message saying Upcoming Tournaments', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Upcoming Tournaments');
  });
});

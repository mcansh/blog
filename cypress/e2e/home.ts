describe('blog index', () => {
  it('works', () => {
    cy.visit('/')
      .findByText(/read more/i)
      .click()
      .findByText(/posted december 9, 2017/i);
  });

  it('shows the navigation menu', () => {
    cy.visit('/')
      .findByTestId('hammy-menu')
      .click()
      .findByText(/home/i)
      .findByTestId('hammy-menu')
      .click();
  });
});

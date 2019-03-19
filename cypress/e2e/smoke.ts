describe('app', () => {
  it('works', () => {
    cy.visit('/')
      .getByText(/read more/i)
      .click()
      .getByText(/posted/i);
  });

  it('opens the sidebar', () => {
    cy.visit('/')
      .getByLabelText(/Open Side Nav/i)
      .click()
      .getByText(/Home/i);
  });
});

module.exports = {
  'Demo Drupal.org': (browser, done) => {
    browser
      .installDrupal()
      .relativeURL('/user/login')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Skip to main content')
      .end();
  },
};

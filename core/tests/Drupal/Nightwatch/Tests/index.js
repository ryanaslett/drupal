module.exports = {
  'Test page': (browser, done) => {
    browser
      .installDrupal('testing', __dirname + '/index.setup.php')
      .relativeURL('/test-page')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Test page text')
      .end();
  },
};

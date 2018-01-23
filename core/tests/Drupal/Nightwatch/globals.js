const chromedriver = require('chromedriver');
const settings = require('../../../nightwatch.settings.json');

module.exports = {
  before: (done) => {
    // Setting up 
    const baseUrl = settings.BASE_URL || process.env.SIMPLETEST_BASE_URL || process.env.BASE_URL;

    if (baseUrl === undefined) {
      throw new Error('Missing a BASE_URL or SIMPLETEST_BASE_URL configuration item.');
    }

    process.env.BASE_URL = process.env.SIMPLETEST_BASE_URL = baseUrl;

    // Note: The simpletest DB is optional, when there is a local drupal
    // installation.
    process.env.SIMPLETEST_DB = settings.DB_URL || process.env.SIMPLETEST_DB;

    if (process.env.NODE_ENV !== 'testbot') {
      chromedriver.start();
    }
    done();
  },
  after: (done) => {
    if (process.env.NODE_ENV !== 'testbot') {
      chromedriver.stop();
    }
    done();
  },
};

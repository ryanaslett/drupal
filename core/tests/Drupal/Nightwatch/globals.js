const chromedriver = require('chromedriver');

module.exports = {
  before: (done) => {
    // Setting up 
    process.env.SIMPLETEST_BASE_URL = process.env.SIMPLETEST_BASE_URL || process.env.BASE_URL;
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

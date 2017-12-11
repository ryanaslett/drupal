const settings = require('../../../../nightwatch.settings.json');

/**
 * Concatenate a BASE_URL variable and a pathname.
 *
 * This provides a custom command, .relativeURL()
 *
 * @param  {string} pathname
 *   The relative path to append to BASE_URL
 * @return {object}
 *   The 'browser' object.
 */
exports.command = function relativeURL(pathname) {
  if (
    (!settings.BASE_URL || settings.BASE_URL === '') &&
    (!process.env.SIMPLETEST_BASE_URL || process.env.SIMPLETEST_BASE_URL === '')) {
    throw new Error('Missing a BASE_URL or SIMPLETEST_BASE_URL configuration item.');
  }
  this
    .url(`${settings.BASE_URL !== '' ? settings.BASE_URL : process.env.SIMPLETEST_BASE_URL}${pathname}`);
  return this;
};

/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-scripted-browsers
 * for details.
 * 
 * var assert = require('assert');
 * $browser.
 * $driver.By.
 * getText()
 */

var assert = require('assert');// 1

$browser.get('http://parikshitsingh.com').then(function () {// 2
  // Check the h4 title matches "Welcome to my professional web portal"
  return $browser.findElement($driver.By.css('h4')).then(function (element) {//3
    return element.getText().then(function (text) {
      assert.equal('Welcome to my professional web portal', text, 'Page H4 title did not match');//4
    });
  });
});

/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-scripted-browsers
 * for details.
 */

var assert = require('assert');
var jsonVar = '{"loginXpath": "//*[text()=\'Login\']", "emailId":"pksingh99@gmail.com", "password":"pksingh",'
  + '"textToFind":"Welcome to my professional web portal", "primaryURL":"http://parikshitsingh.com",'
  + '"loginBtn": "/html/body/main/center/div[3]/div/form/center/div/button"}';

var parsedJson = JSON.parse(jsonVar);

var By = $driver.By;

$browser.get(parsedJson.primaryURL).then(function () {
  // Check the h4 title matches some text
  return $browser.findElement(By.css('h4')).then(function (element) {
    return element.getText().then(function (text) {
      assert.equal(parsedJson.textToFind, text, 'Welcome title did not match');
    });
  });
}).then(function () {
  console.log('Click login Link');
  return $browser.findElement(By.xpath(parsedJson.loginXpath)).click();
}).then(function () {
  console.log('Fill the login form');
  //Find the password field by specifying its id, then enter the password
  console.log('Add emailId');
  return $browser.waitForAndFindElement(By.id("email"), 8000).then(function (username) {
    username.sendKeys(parsedJson.emailId);
    //Find the password field by specifying its id, then enter the password
    console.log('Add password');
    return $browser.findElement(By.id("password")).sendKeys(parsedJson.password).then(function () {
      //Click the Log On button.
      console.log('Click login button');
      return $browser.findElement(By.xpath(parsedJson.loginBtn)).click();
    });
  });
});
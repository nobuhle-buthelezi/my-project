import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import users from '../fixtures/users.json';
import LoginPage from '../page-objects/login.page';

Given('the user is on the login page', async function () {
  await LoginPage.openLoginPage();
});

When('the user logs in with valid credentials', async function () {
  await LoginPage.login(users.validUser.username, users.validUser.password);
});

Then('the user should be redirected to the secure area', async function () {
  await expect(LoginPage.secureAreaHeader).toBeDisplayed();
  await expect(LoginPage.secureAreaHeader).toHaveText('Secure Area');
});

Then('a success message should be displayed', async function () {
  await expect(LoginPage.successMessage).toBeDisplayed();
  await expect(LoginPage.successMessage).toHaveText(
    expect.stringContaining('You logged into a secure area!')
  );
});
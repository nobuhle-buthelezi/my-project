import { Before, After, Status } from '@cucumber/cucumber';

Before(async () => {
  // runs before every scenario
  await browser.deleteCookies();
});

After(async (scenario) => {
  // take screenshot if scenario fails
  if (scenario.result?.status === Status.FAILED) {
    await browser.takeScreenshot();
  }
});
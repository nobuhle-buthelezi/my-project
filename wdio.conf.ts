import type { Options } from '@wdio/types';

export const config: Options.Testrunner & Record<string, any> = {
  runner: 'local',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true
    }
  },
  specs: ['./features/specs/**/*.feature'],
  exclude: [],
  maxInstances: 1,
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome'
  }],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://the-internet.herokuapp.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
  framework: 'cucumber',
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],
  cucumberOpts: {
    require: [
      './features/step-definitions/**/*.ts',
      './features/support/**/*.ts'
    ],
    backtrace: false,
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: true,
    timeout: 60000,
    ignoreUndefinedDefinitions: false
  },
  before: async function () {
    await browser.maximizeWindow();
  }
  ,
  afterTest: async function(test, context, { error, result, passed }) {
    if (!passed) {
      const screenshot = await browser.takeScreenshot();
      // attach screenshot to Allure
      try {
        // @ts-ignore - reporter emit API
        this.reporter?.emit?.('allure:attachment', {
          name: `screenshot-${Date.now()}`,
          type: 'image/png',
          content: Buffer.from(screenshot, 'base64')
        });
      } catch (e) {
        // fallback for older reporter APIs
        // no-op
      }
    }
  },
  afterScenario: async function () {
    await browser.pause(10000);
  }
};
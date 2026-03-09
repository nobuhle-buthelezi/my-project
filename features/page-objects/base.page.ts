export default class BasePage {
  public async open(path: string): Promise<void> {
    await browser.url(path);
  }

  private async resolveEl(element: any): Promise<WebdriverIO.Element> {
    return await element as WebdriverIO.Element;
  }

  public async click(element: any): Promise<void> {
    const el = await this.resolveEl(element);
    await el.waitForClickable({ timeout: 10000 });
    await el.click();
  }

  public async type(element: any, value: string): Promise<void> {
    const el = await this.resolveEl(element);
    await el.waitForDisplayed({ timeout: 10000 });
    await el.setValue(value);
  }

  public async getText(element: any): Promise<string> {
    const el = await this.resolveEl(element);
    await el.waitForDisplayed({ timeout: 10000 });
    return await el.getText();
  }
}
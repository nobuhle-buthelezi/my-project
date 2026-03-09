import BasePage from './base.page';

class LoginPage extends BasePage {
  public get usernameInput() {
    return $('#username');
  }

  public get passwordInput() {
    return $('#password');
  }

  public get loginButton() {
    return $('button[type="submit"]');
  }

  public get successMessage() {
    return $('#flash');
  }

  public get secureAreaHeader() {
    return $('h2');
  }

  public async openLoginPage(): Promise<void> {
    await this.open('/login');
  }

  public async login(username: string, password: string): Promise<void> {
    const userEl = await this.usernameInput;
    const passEl = await this.passwordInput;
    const loginBtn = await this.loginButton;

    await this.type(userEl, username);
    await this.type(passEl, password);
    await this.click(loginBtn);
  }
  
}

export default new LoginPage();
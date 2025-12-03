import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async navigateToLogin() {
    await this.page.goto('/login');
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn();
  }

  async verifyEmailFieldVisible() {
    await expect(this.emailInput).toBeVisible();
  }

  async verifyPasswordFieldVisible() {
    await expect(this.passwordInput).toBeVisible();
  }

  async verifySignInButtonVisible() {
    await expect(this.signInButton).toBeVisible();
  }

  async verifySignInButtonEnabled() {
    await expect(this.signInButton).toBeEnabled();
  }

  async verifyPasswordIsMasked() {
    const passwordType = await this.passwordInput.getAttribute('type');
    expect(passwordType).toBe('password');
  }
}


import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly header: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly logoutButton: Locator;
  readonly historyButton: Locator;
  readonly historyDialog: Locator;
  readonly historyEmptyState: Locator;
  readonly clearHistoryButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText('Welcome back, QA TEST!');
    this.searchInput = page.getByRole('textbox');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.historyButton = page.getByRole('button', { name: 'History' });
    
    // History dialog
    this.historyDialog = page.getByRole('heading', { name: 'Search History' });
    this.historyEmptyState = page.getByText('No search history yet');
    this.clearHistoryButton = page.getByRole('button', { name: 'Clear History' });
  }

  async verifyHeaderVisible() {
    await expect(this.header).toBeVisible();
  }

  async verifySearchVisible() {
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchButton).toBeVisible();
  }

  async verifySearchButtonDisabled() {
    await expect(this.searchButton).toBeDisabled();
  }

  async verifyNavbarButtons() {
    await expect(this.logoutButton).toBeVisible();
    await expect(this.historyButton).toBeVisible();
  }

  async openHistory() {
    await this.historyButton.click();
    await expect(this.historyDialog).toBeVisible();
  }

  async verifyHistoryEmpty() {
    await expect(this.historyEmptyState).toBeVisible();
  }

  async performSearch(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
    // assume search triggers save to history and stays on dashboard
  }

  async verifyHistoryContains(keyword: string) {
    // assumes history dialog is already open
    await expect(this.page.getByText(keyword)).toBeVisible();
  }

  async closeHistory() {
    // attempt to close the dialog with Escape; adjust if your app uses a specific close button
    await this.page.keyboard.press('Escape');
    // ensure dialog is not visible
    await expect(this.historyDialog).not.toBeVisible();
  }
}

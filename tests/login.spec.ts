import {test, expect} from '@playwright/test';  // Import Playwright's test and expect functions
import {LoginPage} from '../pages/LoginPage';   // Import the LoginPage class

test.describe('SauceDemo Login (POM)', () => {  // Group tests related to SauceDemo login

    test('Login successfully with valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();  // Navigate to the login page
        await loginPage.login('standard_user', 'secret_sauce');  // Perform login with valid credentials
        
        await expect(page).toHaveURL(/inventory/);  // Asserts that the page navigated to the inventory page after login
        await expect(page.locator('.inventory_list')).toBeVisible();  // Asserts that the inventory list is visible
      });
      
    test('Login should fail due to invalid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('invalid_user', 'invalid_password');  // Attempt to login with invalid credentials

        await expect(loginPage.errorMessage).toBeVisible();  // Asserts that the error message is visible
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');  // Asserts that the error message contains the expected text 
    });
});
import { Page } from '@playwright/test'; // Import the Page type from Playwright


export class LoginPage {    // Define the LoginPage class to encapsulate login functionality

    constructor(private page: Page) {}  // Constructor that takes a Playwright Page object

    async goto() {  // Navigate to the login page   
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {   // Perform login with the provided username and password
        await this.page.fill('#user-name', username);
        await this.page.fill('#password', password);
        await this.page.click('#login-button');
    }

    get errorMessage() {    // Getter for the error message element
        return this.page.locator('[data-test="error"]');
    }
    
}
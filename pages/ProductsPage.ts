import { Page } from "@playwright/test"; 

export class ProductsPage {  // Define the ProductsPage class to encapsulate product-related functionality
    constructor(private page: Page) {}  // Constructor that takes a Playwright Page object

    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async addToCart(productName: string) {

        const slug = productName.toLowerCase().replaceAll(' ', '-');  // Convert product name to slug format
        const buttonName = `add-to-cart-${slug}`;  // Create button name based on the slug


        await this.page.pause();
        await this.page
            .locator('.inventory_item')
            .filter({ has: this.page.locator('text="Sauce Labs Backpack"') })
            .locator('button:has-text("Add to cart")')
            .click();

    }
}
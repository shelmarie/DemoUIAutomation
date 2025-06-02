import { expect, Page } from "@playwright/test"; 

export class ProductsPage {  // Define the ProductsPage class to encapsulate product-related functionality
    constructor(private page: Page) {}  // Constructor that takes a Playwright Page object

    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async addToCart(productName: string) {

        const slug = productName.toLowerCase().replaceAll(' ', '-');  // Convert product name to slug format
        const addButtonName = `add-to-cart-${slug}`;  // Create button name based on the slug
        const removeButtonName = `remove-${slug}`;  // Create remove button name based on the slug

        const product = this.page
            .locator('.inventory_item')
            .filter({ has: this.page.locator(`.inventory_item_name:has-text("${productName}")`) });

        const addButton = product.locator(`button[name="${addButtonName}"]`);  // Locate the "Add to cart" button using the button name

        await expect(addButton).toBeVisible({timeout:5000});  // Ensure the button is visible before clicking
        await addButton.scrollIntoViewIfNeeded();  // Scroll the button into view if necessary
        await addButton.click();  // Click the "Add to cart" button

        const removeButton = product.locator(`button[name="${removeButtonName}"]`);  // Locate the "Remove" button after adding to cart
        await expect(removeButton).toBeVisible({timeout:5000});  // Ensure the "Remove" button is visible

    }

    async addMultipleProductsToCart(productNames: string[]) {
        for (const productName of productNames) {  // Iterate over each product name
            await this.addToCart(productName);  // Call the addToCart method for each product
        }
        const cartButton = this.page.locator('.shopping_cart_link');  // Locate the cart button
        await expect(cartButton).toHaveText(productNames.length.toString());  // Assert that the cart button shows the correct number of items
    }
}
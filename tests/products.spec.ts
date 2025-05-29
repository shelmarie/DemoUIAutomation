import {test, expect} from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { LoginPage } from '../pages/LoginPage';  // Import the LoginPage class

test.describe('SauceDemo Products (POM)', () => {

    test('Add a product to the cart', async ({page}) => {

        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        await loginPage.goto();  // Navigate to the login page
        await loginPage.login('standard_user', 'secret_sauce');  // Perform login with valid credentials

        await productsPage.goto();  // Navigate to the products page
        await productsPage.addToCart('Sauce Labs Backpack');  // Add a specific product to the cart

        // Verify that the product was added to the cart
        const cartButton = page.locator('.shopping_cart_link');
        await expect(cartButton).toHaveText('1');  // Assert that the cart shows 1 item
    });

    
})
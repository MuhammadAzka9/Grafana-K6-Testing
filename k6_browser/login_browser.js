import { browser } from 'k6/browser';
import { check, sleep, fail } from 'k6';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      vus: 1, // bisa ditambah misalnya 5 untuk 5 user paralel
      iterations: 1,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    // 1. Buka halaman login
    await page.goto('https://www.saucedemo.com/');
    await page.waitForSelector('#user-name');

    // 2. Login
    await page.locator('#user-name').type('standard_user');
    await page.locator('#password').type('secret_sauce');
    await page.locator('#login-button').click();
    await page.waitForSelector('.inventory_list');

    check(page, {
      'Berhasil login': (p) => p.url().includes('inventory.html'),
    });

    // 3. Add to cart "Sauce Labs Backpack"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.waitForSelector('.shopping_cart_badge');

    // ✅ Ambil cartCount dulu baru check
    const cartCount = await page.locator('.shopping_cart_badge').textContent();
    check(cartCount, {
      'Produk berhasil ditambahkan': (c) => c === '1',
    });

    // 4. Logout
    await page.locator('#react-burger-menu-btn').click();
    await page.waitForSelector('#logout_sidebar_link');
    await page.locator('#logout_sidebar_link').click();
    await page.waitForSelector('#login-button');

    check(page, {
      'Berhasil logout': (p) => p.url().includes('saucedemo.com'),
    });

  } catch (error) {
    fail(`Browser test gagal: ${error.message}`);
  } finally {
    await page.close();
  }

  sleep(1);
}
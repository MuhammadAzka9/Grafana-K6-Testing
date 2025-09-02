import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 }, // 10 users for 30 seconds
    { duration: '1m', target: 20 }, // 20 users for 1 minute
    { duration: '30s', target: 0 }, // scale down to 0 users
  ],
};

export default function () {
  // Pembukaan halaman utama
  let response = http.get('https://www.saucedemo.com/');
  check(response, {
    'Status is 200': (r) => r.status === 200,
  });

  // Masuk ke akun
  response = http.post(
    'https://www.saucedemo.com/inventory.html',
    {
      username: 'standard_user',
      password: 'secret_sauce',
    },
  );
  check(response, {
    'Login successful': (r) => r.status === 200,
  });

  // Pilih produk dan tambahkan ke keranjang belanja
  response = http.post('https://www.saucedemo.com/cart.html', {
    addtocart: 'item_id',
  });
  check(response, {
    'Product added to cart': (r) => r.status === 200,
  });

  // Checkout
  response = http.post('https://www.saucedemo.com/checkout-step-one.html', {
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '12345',
  });
  check(response, {
    'Checkout successful': (r) => r.status === 200,
  });

  // Tunggu sebentar sebelum mengakhiri iterasi
  sleep(1);
}

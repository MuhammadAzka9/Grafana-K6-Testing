Ini merupakan portofolio saya membuat load testing menggunakan Grafana k6 dengan bahasa pemrograman JavaScript

Install Grafana K6 :
    1. Insall Nodejs di laptop/PC Anda dapat diunduh melalui link berikut https://nodejs.org/en/download
    2. Buat direktori anda dahulu
    3. Buka direktori tersebut melalui terminal/cmd 
    4. Jalankan perintah install k6 sesuai OS https://grafana.com/docs/k6/latest/set-up/install-k6/

Berikut command untuk menjalankan Grafana k6 :
    1. Cara menjalankan k6 agar terlihat grafiknya
        $env:K6_WEB_DASHBOARD = "true"; k6 run namascript.js
    2. Cara menjalankan k6 agar terlihat browsernya
        $env:K6_BROWSER_ENABLED='true'; $env:K6_BROWSER_HEADLESS='false'; k6 run namascript.js
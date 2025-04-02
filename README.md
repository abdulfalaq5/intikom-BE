# Product API Setup

## Persyaratan Sistem
- Node.js
- MySQL
- npm atau yarn

## Konfigurasi Database
Sistem ini menggunakan MySQL sebagai database. Pastikan Anda memiliki MySQL terinstall di komputer Anda.

### Pengaturan Environment Variables
Buat file `.env` di root project dengan konfigurasi berikut:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=db_product
PORT=9494
```

## Langkah-langkah Instalasi

1. Clone repository ini
```bash
git clone https://github.com/abdulfalaq5/intikom-BE
```

2. Masuk ke direktori project
```bash
cd product-api
```

3. Install dependencies
```bash
npm install
# atau
yarn install
```

4. Buat database MySQL
```sql
CREATE DATABASE db_product;
```

5. Jalankan aplikasi
```bash
npm start
# atau
yarn start
```

Server akan berjalan di `http://localhost:9494`

## Endpoints API

(Disini Anda bisa menambahkan daftar endpoint API yang tersedia. Karena saya tidak memiliki akses ke kode lengkapnya, saya sarankan untuk menambahkan endpoint-endpoint yang ada di sistem Anda)

## Catatan Keamanan
- Pastikan untuk mengganti password database default di file `.env`
- Jangan meng-commit file `.env` ke repository
- Gunakan environment variables yang berbeda untuk development dan production

## Dokumentasi
Dokumentasi menggunakan Sweger bisa di akses di url http://localhost:9494/api-docs/ 
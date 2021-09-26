// Core Module
// File Sistem
const fs = require('fs');

// ReadLine
const readline = require('readline');

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

// Membuat foler data
const dirPath = './data';
if (!fs.existsSync(dirPath)) { // Jika forlder belum ada maka dibuatkan
   fs.mkdirSync(dirPath);
}

//Membuat file JSON jka belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
   fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const tulisPertanyaan = (pertanyaan) => {
   return new Promise((resolve, reject) => {
      rl.question(pertanyaan, (nama) => {
         resolve(nama);
      });
   });
}


const simpanContact = (nama, nomor, email) => {
   const contact = {
      nama,
      nomor,
      email
   };
   const file = fs.readFileSync('data/contacts.json', 'utf-8'); // baca file
   const contacts = JSON.parse(file); // merubah string ke bentuk JSON

   contacts.push(contact); // masukan input sesuai urutan selanjudnya di file /data/contacts.json

   fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); // Merubah JSON Menjadi string

   console.log(`Terimakasih `);

   rl.close();
}

// exports method yang mau digunakan
module.exports = {
   tulisPertanyaan,
   simpanContact
}
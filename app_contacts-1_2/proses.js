// Core Module
// File Sistem
const fs = require('fs');
const chalk = require('chalk');
var validator = require('validator');

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

const simpanContact = (nama, nomor, email) => {
   const contact = {
      nama,
      nomor,
      email
   };
   const file = fs.readFileSync('data/contacts.json', 'utf-8'); // baca file
   const contacts = JSON.parse(file); // merubah string ke bentuk JSON

   // cek duplikat nama
   const duplikat = contacts.find((contact) => contact.nama === nama);
   if (duplikat) {
      console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain'));
      return false;
   }

   // cek email
   if (email) {
      if (!validator.isEmail(email)) {
         console.log(chalk.red.inverse.bold('Email yang anda masukan tidak valid'));
         return false;
      }
   }

   // cek nomor
   if (!validator.isMobilePhone(nomor, 'id-ID')) {
      console.log(chalk.red.inverse.bold('Nomor tidak valid'));
      return false;
   }

   contacts.push(contact); // masukan input sesuai urutan selanjudnya di file /data/contacts.json

   fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); // Merubah JSON Menjadi string

   console.log(chalk.green.inverse.bold(`Terimakasih, Dat anda berhasil di simpan`));
}

// exports method yang mau digunakan
module.exports = {
   simpanContact
}
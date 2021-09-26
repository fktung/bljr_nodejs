// Core Module
// File Sistem
const fs = require('fs');
const chalk = require('chalk');
var validator = require('validator');

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

// funtion mengambil semua contact yang telah tersimpan
const loadContact = () => {
   const file = fs.readFileSync('data/contacts.json', 'utf-8'); // baca file
   const contacts = JSON.parse(file); // merubah string ke bentuk JSON
   return contacts;
}

// funtion menyimpan contact baru
const simpanContact = (nama, nomor, email) => {
   const contact = {
      nama,
      nomor,
      email
   };
   // const file = fs.readFileSync('data/contacts.json', 'utf-8'); // baca file
   // const contacts = JSON.parse(file); // merubah string ke bentuk JSON
   const contacts = loadContact();

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
};

// funtion menampilkan semua isi contact
const listContact = () => {
   const contacts = loadContact();
   console.log(chalk.cyan.inverse.bold('Daftar Kontak : '));
   contacts.forEach((contact, i) => {
      console.log(`${i + 1}. ${contact.nama} - ${contact.nomor}`);
   });
};

// funtion Detail
const detailContact = (nama) => {
   const contacts = loadContact();

   const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

   if (!contact) {
      console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
      return false
   }

   console.log(chalk.cyan.inverse.bold(contact.nama));
   console.log(contact.nomor);
   if (contact.email) {
      console.log(contact.email);
   }
};

const tulisPertanyaan = (pertanyaan) => {
   return new Promise((resolve, reject) => {
      rl.question(pertanyaan, (nama) => {
         resolve(nama);
      });
   });
}

const updateContact = (nama) => {
   const contacts = loadContact();

   const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

   if (!contact) {
      console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
      return false
   }

   const oldContact = contact;

   console.log('Data lama : ');
   console.log(oldContact);

   console.log(chalk.bold('Update contact nama : '));
   console.log(chalk.cyan.inverse.bold(contact.nama));

   // contact.nomor = async () => await tulisPertanyaan('Masukan nomor : ');
   // contact.email = async () => await tulisPertanyaan('Masukan email : ');

   // console.log(contact);

   // fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); // Merubah JSON Menjadi string

   // console.log(chalk.green.inverse.bold(`Terimakasih, Dat anda berhasil di update`));

   rl.question('Masukan Nomor = ', (nomor) => {
      rl.question('Masukan Email = ', (email) => {
         // console.log(`Terimakasih: ${nama}, Nomor anda ${nomor}`);

         contact.nomor = nomor;
         contact.email = email;

         console.log(contact);

         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); // Merubah JSON Menjadi string

         console.log(chalk.green.inverse.bold(`Terimakasih, Dat anda berhasil di update`));
         rl.close();
      });
   });
};

// funtion menghapus contact berdasarkan nama
const deleteContact = (nama) => {
   const contacts = loadContact();
   const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

   if (contacts.length === newContact.length) {
      console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
      return false
   }

   fs.writeFileSync('data/contacts.json', JSON.stringify(newContact)); // Merubah JSON Menjadi string

   console.log(chalk.green.inverse.bold(`Data contact ${nama} berhasil dihapus!`));
};


// exports method yang mau digunakan
module.exports = {
   simpanContact,
   listContact,
   detailContact,
   updateContact,
   deleteContact
};
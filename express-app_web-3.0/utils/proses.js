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

// funtion mengambil semua contact yang telah tersimpan
const loadContact = () => {
   const file = fs.readFileSync('data/contacts.json', 'utf-8'); // baca file
   const contacts = JSON.parse(file); // merubah string ke bentuk JSON
   return contacts;
}

// Mengambil contact berdasarkan nama
const findContact = (nama) => {
   const contacts = loadContact();
   const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
   return contact;
}

// Menimpa/Menulis file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
   fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
};

// Menambahkan data contact baru
const addContact = (contact) => {
   const contacts = loadContact();
   contacts.push(contact);
   saveContacts(contacts);
};

const cekDuplikat = (nama) => {
   const contacts = loadContact();
   return contacts.find((contact) => contact.nama === nama);
}

// Menghapus Contact
const deleteContact = (nama) => {
   const contacts = loadContact();
   const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
   saveContacts(filteredContacts);
}

// Mengubah Contacts
const updateContacts = (contactBaru) => {
   const contacts = loadContact();
   const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
   delete contactBaru.oldNama; // === Menghapus properti dalam objek
   filteredContacts.push(contactBaru);
   saveContacts(filteredContacts);
};

module.exports = {
   loadContact,
   findContact,
   addContact,
   cekDuplikat,
   deleteContact,
   updateContacts
}
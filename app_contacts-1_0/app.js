// Core Module
// File Sistem
const fs = require('fs');

// // menuliskan string ke file (Synchronous)
// try {
//    fs.writeFileSync('data/test.txt', 'Hello word secara Synchronous');
// } catch(e) {
//    console.log(e);
// }

// // menuliskan string ke file (Asynchronous)
// fs.writeFileSync('data/test.txt', 'Hello word secara Asynchronous', (e) => {
//    console.log(e);
// });

// // Membaca isis file secara (Synchronous)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// // Membaca isis file secara (Asynchronous)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//    if (err) throw err;
//    console.log(data);
//  });


// ReadLine
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Masukan Nama Anda? ', (nama) => {
   rl.question('Masukan Nomor Anda? ', (nomor) => {
      // console.log(`Terimakasih: ${nama}, Nomor anda ${nomor}`);
      const contact  = { nama, nomor };
      const file     = fs.readFileSync('data/contacts.json', 'utf-8'); // baca file
      const contacts = JSON.parse(file); // merubah string ke bentuk JSON

      contacts.push(contact);

      fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); // Merubah JSON Menjadi string

      console.log(`Terimakasih `);

      rl.close();
   });
 });
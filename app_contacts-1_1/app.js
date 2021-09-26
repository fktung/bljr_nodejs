// const {
//   tulusPertanyaan,
//   simpanContact
// } = require('./proses'); // memecah langsung menjadi variabel yang dipanggil
const contacts = require('./proses');

const main = async () => {
  const nama = await contacts.tulisPertanyaan('Masukan nama anda : ');
  const nomor = await contacts.tulisPertanyaan('Masukan nomor anda : ');
  const email = await contacts.tulisPertanyaan('Masukan email anda : ');

  contacts.simpanContact(nama, nomor, email);
}

main();













// rl.question('Masukan Nama Anda? ', (nama) => {
//    rl.question('Masukan Nomor Anda? ', (nomor) => {
//       // console.log(`Terimakasih: ${nama}, Nomor anda ${nomor}`);
//       const contact  = { nama, nomor };
//       const file     = fs.readFileSync('data/contacts.json', 'utf-8'); // baca file
//       const contacts = JSON.parse(file); // merubah string ke bentuk JSON

//       contacts.push(contact);

//       fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); // Merubah JSON Menjadi string

//       console.log(`Terimakasih `);

//       rl.close();
//    });
//  });
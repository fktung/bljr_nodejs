// // Memangambil argument dari command line
// console.log(process.argv[2]);

const yargs = require("yargs");
const proses = require("./proses");

yargs.command({
  command: 'add',
  describe: 'Menambahakan contact baru',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string',
    },
    nomor: {
      describe: 'Nomor Handphone',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    // const contact = {
    //   nama: argv.nama,
    //   email: argv.email,
    //   nomor: argv.nomor,
    // };
    // console.log(contact);
    proses.simpanContact(argv.nama, argv.nomor, argv.email);
  }
});

yargs.parse();






























// // const {
// //   tulusPertanyaan,
// //   simpanContact
// // } = require('./proses'); // memecah langsung menjadi variabel yang dipanggil
// const contacts = require('./proses');

// const main = async () => {
//   const nama = await contacts.tulisPertanyaan('Masukan nama anda : ');
//   const nomor = await contacts.tulisPertanyaan('Masukan nomor anda : ');
//   const email = await contacts.tulisPertanyaan('Masukan email anda : ');

//   contacts.simpanContact(nama, nomor, email);
// }

// main();
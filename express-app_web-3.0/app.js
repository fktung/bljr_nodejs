const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {
   loadContact,
   findContact,
   addContact,
   cekDuplikat,
   deleteContact,
   updateContacts
} = require('./utils/proses');
const {
   body,
   validationResult,
   check
} = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

// Gunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Built-in middleware - memanggil file static untuk ditampilkan ke public
app.use(express.static('public'));
app.use(express.urlencoded({
   extended: true
}));

// Konfigurasi Flash
app.use(cookieParser('secret'));
app.use(session({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true,
   cookie: {
      maxAge: 6000
   }
}));
app.use(flash());

app.get('/', (req, res) => {
   const mahasiswa = [{
         nama: 'Kentung',
         nomor: '12345678',
      },
      {
         nama: 'Febri',
         nomor: '87654321',
      },
      {
         nama: 'aku dewe',
         nomor: '123123123',
      }
   ];
   res.render('index', {
      layout: 'main/view', // Memanggil halaman utama yang berisi header dan footer jadi satu
      title: "Halaman Home",
      mahasiswa: mahasiswa
   });
});

app.get('/about', (req, res) => {
   // res.sendFile('./about.html', {
   //    root: __dirname
   // });
   res.render('about', {
      layout: 'main/view', // Memanggil halaman utama yang berisi header dan footer jadi satu
      nama: "Febri Kentung",
      title: "Halaman About"
   });
});

app.get('/contact', (req, res) => {
   const contacts = loadContact();

   res.render('contact', {
      layout: 'main/view', // Memanggil halaman utama yang berisi header dan footer jadi satu
      title: "Halaman Contact",
      contacts,
      msg: req.flash('msg'),
   });
});

// Halaman form tambah data contak
app.get('/contact/add', (req, res) => {
   res.render('add-contact', {
      title: "Halaman Tambah Contact",
      layout: 'main/view', // Memanggil halaman utama yang berisi header dan footer jadi satu
   });
});

// Proses Simpan data contact dan validasi
app.post('/contact', [
   body('nama').custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
         throw new Error('Nama contact sudah terdaftar');
      }
      return true;
   }),
   check('email', 'Email tidak valid!').isEmail(),
   check('nomor', 'Nomer HP tidak valid!').isMobilePhone('id-ID')
], (req, res) => {
   // res.send(req.body);

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      // return res.status(400).json({
      //    errors: errors.array()
      // });
      res.render('add-contact', {
         title: 'Halaman Tambah Contact',
         layout: 'main/view',
         errors: errors.array(),
      });
   } else {
      addContact(req.body);
      req.flash('msg', 'Data contact berhasil ditambahkan!'); // Kirim Flash Massage
      res.redirect('/contact');
   }
});

// Proses Delete contact
app.get('/contact/delete/:nama', (req, res) => {
   const contact = findContact(req.params.nama);

   if (!contact) {
      res.status(404);
      res.send('<h1>404</h1>');
   } else {
      deleteContact(req.params.nama);
      req.flash('msg', 'Data contact berhasil dihapus!'); // Kirim Flash Massage
      res.redirect('/contact');
   }
});

// Halaman form Edit data contak
app.get('/contact/edit/:nama', (req, res) => {
   const contact = findContact(req.params.nama);

   res.render('edit-contact', {
      title: "Halaman Edit Contact",
      layout: 'main/view', // Memanggil halaman utama yang berisi header dan footer jadi satu
      contact,
   });
});

// Proses Update contact
// app.post('/contact/update', (req, res) => {
//    res.send(req.body);
// });
app.post('/contact/update', [
   body('nama').custom((value, {
      req
   }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
         throw new Error('Nama contact sudah terdaftar');
      }
      return true;
   }),
   check('email', 'Email tidak valid!').isEmail(),
   check('nomor', 'Nomer HP tidak valid!').isMobilePhone('id-ID')
], (req, res) => {
   // res.send(req.body);

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      // return res.status(400).json({
      //    errors: errors.array()
      // });
      res.render('edit-contact', {
         title: 'Halaman Ubah Contact',
         layout: 'main/view',
         errors: errors.array(),
         contact: req.body,
      });
   } else {
      // res.send(req.body);
      updateContacts(req.body);
      req.flash('msg', 'Data contact berhasil diubah!'); // Kirim Flash Massage
      res.redirect('/contact');
   }
});

// Halaman Detail Contact
app.get('/contact/:nama', (req, res) => {
   const contact = findContact(req.params.nama);
   res.render('detail', {
      layout: 'main/view', // Memanggil halaman utama yang berisi header dan footer jadi satu
      title: "Halaman Detail",
      contact,
   });
});

app.get('/product/:id', (req, res) => {
   res.send(`Product : ${req.params.id} <br> Category ID : ${req.query.category}`)
});
// url = http://localhost:3000/product/210?category=sepatu

app.use('/', (req, res) => {
   res.status(404);
   res.send('<h1>404</h1>');
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
});
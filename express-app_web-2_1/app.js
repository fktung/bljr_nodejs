const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// Gunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// res.sendFile() = Dapat digunakan untuk menampilkan file IMG, PDF, Atau file lain yang bisa dibaca
app.get('/', (req, res) => {
   // res.sendFile('./index.html', {
   //    root: __dirname
   // });
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
      nama: "kentung",
      title: "Halaman About"
   });
});

app.get('/contact', (req, res) => {
   // res.send('Ini halaman contact')
   res.render('contact', {
      layout: 'main/view', // Memanggil halaman utama yang berisi header dan footer jadi satu
      title: "Halaman Contact"
   });
});

// app.get('/product/:id', (req, res) => {
//    res.send('Product ' + req.params.id)
// });

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
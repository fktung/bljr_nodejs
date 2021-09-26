const express = require('express')
const app = express()
const port = 3000

// res.sendFile() = Dapat digunakan untuk menampilkan file IMG, PDF, Atau file lain yang bisa dibaca
app.get('/', (req, res) => {
   // res.json({
   //    nama: 'kentung',
   //    alamat: 'tanggulangin',
   //    syatus: 'lajang',
   // });
   res.sendFile('./index.html', {
      root: __dirname
   });
});

app.get('/about', (req, res) => {
   res.sendFile('./about.html', {
      root: __dirname
   });
});

app.get('/contact', (req, res) => {
   res.send('Ini halaman contact')
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




// const fs = require('fs');
// const http = require('http');
// const port = 3000;

// const renderHTML = (path, res) => {
//    fs.readFile(path, (err, data) => {
//       if (err) {
//          res.writeHead(404);
//          res.write('Error: file not found');
//       } else {
//          res.write(data);
//       }
//       res.end();
//    });
// }

// http.createServer((req, res) => {

//       res.writeHead(200, {
//          'Content-Type': 'text/html',
//       });

//       const url = req.url;

//       switch (url) {
//          case '/about':
//             renderHTML('./about.html', res);
//             break;
//          case '/contact':
//             res.write('<h2>Ini Halaman Contact</h2>');
//             res.end();
//             break;
//          default:
//             renderHTML('./index.html', res);
//             break;
//       }

//       // if (url === '/about') {
//       //    renderHTML('./about.html', res);
//       // } else if (url === '/contact') {
//       //    res.write('<h2>Ini Halaman Contact</h2>');
//       //    res.end();
//       // } else {
//       //    renderHTML('./index.html', res);
//       //    // // res.write('Hallo word!');
//       //    // fs.readFile('./index.html', (err, data) => {
//       //    //    if (err) {
//       //    //       res.writeHead(404);
//       //    //       res.write('Error: file not found');
//       //    //    } else {
//       //    //       res.write(data);
//       //    //    }
//       //    //    res.end();
//       //    // })
//       // }

//    })
//    .listen(port, () => {
//       console.log(`Server is listening on port ${port}..`);
//    });
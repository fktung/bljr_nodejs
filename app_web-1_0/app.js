const fs = require('fs');
const http = require('http');
const port = 3000;

const renderHTML = (path, res) => {
   fs.readFile(path, (err, data) => {
      if (err) {
         res.writeHead(404);
         res.write('Error: file not found');
      } else {
         res.write(data);
      }
      res.end();
   });
}

http.createServer((req, res) => {

      res.writeHead(200, {
         'Content-Type': 'text/html',
      });

      const url = req.url;

      switch (url) {
         case '/about':
            renderHTML('./about.html', res);
            break;
         case '/contact':
            res.write('<h2>Ini Halaman Contact</h2>');
            res.end();
            break;
         default:
            renderHTML('./index.html', res);
            break;
      }

      // if (url === '/about') {
      //    renderHTML('./about.html', res);
      // } else if (url === '/contact') {
      //    res.write('<h2>Ini Halaman Contact</h2>');
      //    res.end();
      // } else {
      //    renderHTML('./index.html', res);
      //    // // res.write('Hallo word!');
      //    // fs.readFile('./index.html', (err, data) => {
      //    //    if (err) {
      //    //       res.writeHead(404);
      //    //       res.write('Error: file not found');
      //    //    } else {
      //    //       res.write(data);
      //    //    }
      //    //    res.end();
      //    // })
      // }

   })
   .listen(port, () => {
      console.log(`Server is listening on port ${port}..`);
   });
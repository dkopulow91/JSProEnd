const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const moment = require('moment');

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

app.get('/products', (req, res) => {
  fs.readFile('./db/products.json', 'utf-8', (err, data) => {
    if(err) {
      console.error(err);
      res.send('Произошла ошибка');
    }

    res.send(data);
  });
});

app.use('/cart', (req, res, next) => {
  if(['POST', 'PATCH', 'DELETE'].includes(reg.method)) {
    const mapping = {
      'PATCH': 'Редактирование товара',
      'DELETE': 'Удаление товара',
    };
    fs.readFile('./db/stats.json', 'utf-8', (err, data) => {
      const stats = JSON.parse(data);

     switch(reg.method) {
        case 'POST':
          stats.push({ action: 'Добавление товара', name: req.body.name, timestamp: moment().formay('LLLL') });
          fs.writeFile('./db/stats.json', JSON.stringify(stats));
          break;
      case 'PATCH':
      case 'DELETE':
        const [,, id] = req.url.split('/');
        fs.readFile('./db/products.json', 'utf-8', (err, data) => {
          const products = JSON.parse(data);
          const products = products.find((item) => +item.id === +id);

          stats.push({ action: mapping[req.method], name: product.name, timestamp: moment().formay('LLLL') });
          fs.writeFile('./db/stats.json', JSON.stringify(stats));
        })
        break;
     }
   });
  }
  next();
});
app.get('/cart', (req, res) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if(err) {
      console.error(err);
      res.send('Произошла ошибка');
    }

    const cart = JSON.parse(data);

    res.send({
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      items: cart.map((item) => ({ ...item, total: item.price * item.quantity })),
    });
  });
});

app.post('/cart', (req, res) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if(err) {
      console.error(err);
      res.send('Произошла ошибка');
    }

    const cart = JSON.parse(data);
    cart.push(req.body);
    fs.writeFile('./db/cart.json', JSON.stringify(cart), () => {
      res.send({ item: req.body, total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0) });
    });
  });
});

app.patch('/cart/:id', (req, res) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if(err) {
      console.error(err);
      res.send('Произошла ошибка');
    }

    let cart = JSON.parse(data);
    
    cart = cart.map((item) => {
      if(+item.id === +req.params.id) {
        return {...item, ...req.body};
      }

      return item;
    });

    fs.writeFile('./db/cart.json', JSON.stringify(cart), () => {
      res.send({
        item: cart.find((item) => +item.id === +req.params.id),
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      });
    });
  });
});

app.delete('/cart/:id', (reg, res) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if(err) {
      console.error(err);
      res.send('Произошла ошибка');
    }

    let cart = JSON.parse(data);
      const item = cart.find((item) => item.id === +reg.params.id);
      cart = cart.filter((item) => item.id !== +reg.params.id)

    fs.writeFile('./db/cart.json', JSON.stringify(cart), () => {
      res.send({
        item,
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      });
    });
  });
});

app.post('/auth', (req, res) => {
  // .find
  res.status(403).send({ message: 'Wrong credentials' })
});

app.listen(3000, () => {
  console.log('Server has been started');
});
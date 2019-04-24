const fs = require('fs');

fs.readFile('./products.json', 'utf-8', (err, data) => {
  if(err) {
    console.log(err);
    return;
  }

  const products = JSON.parse(data);
  products.push({ "id": 4, "name": "Зарядка", "price": 2500 });

  fs.writeFile('./products.json', JSON.stringify(products), (err) => {
    console.log('Done!');
  });
});
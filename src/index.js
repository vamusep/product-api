const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // importar CORS

const app = express();
const port = 3001; //cambiar a puerto que funcione (3000 o 3001)

app.use(cors()); // Usar CORS
app.use(bodyParser.json());

//datos de productos
let products = [
  { id: 1, codigo_barras: '7804643820154', marca: 'Love Lemon', producto: 'Limonada menta jenjibre', categoria: 'Bebestibles' },
  { id: 2, codigo_barras: '7622201717636', marca: 'Club Social', producto: 'Galletas Saladas', categoria: 'Snack' }
];

// ENDPOINTS
//obtener todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

//Para agregar un nuevo producto
app.post('/products', (req, res) => {
  const { codigo_barras, marca, producto, categoria } = req.body;
  const newProduct = {
    id: products.length + 1,
    codigo_barras,
    marca,
    producto,
    categoria
  };
  products.push(newProduct);
  res.json(newProduct);
});

//buscar por ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Para actualizar un producto
app.put('/products/:id', (req, res) => {
  const { codigo_barras, marca, producto, categoria } = req.body;
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    product.codigo_barras = codigo_barras;
    product.marca = marca;
    product.producto = producto;
    product.categoria = categoria;
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// para eliminar un producto
app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex > -1) {
    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

//servidor local
app.listen(port, () => {
  console.log(`Servidor local en http://localhost:${port}/`);
});

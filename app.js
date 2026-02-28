const express = require('express');
const app = express();
const port = 3000;

let products = [
    { id: 1, name: 'Ноутбук', price: 75000 },
    { id: 2, name: 'Смартфон', price: 35000 },
    { id: 3, name: 'Наушники', price: 8000 },
];

app.use(express.json());

app.get('/', (req, res) => {
    res.json(products);
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ error: 'Товар не найден' });
    res.json(product);
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || price === undefined) return res.status(400).json({ error: 'Укажите название и стоимость' });
    const newProduct = { id: Date.now(), name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ error: 'Товар не найден' });
    const { name, price } = req.body;
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const exists = products.some(p => p.id == req.params.id);
    if (!exists) return res.status(404).json({ error: 'Товар не найден' });
    products = products.filter(p => p.id != req.params.id);
    res.json({ message: 'Товар удалён' });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
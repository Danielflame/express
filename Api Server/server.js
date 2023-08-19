const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());

const inventory = [];

// Create item
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = inventory.length + 1;
  inventory.push(newItem);
  res.status(201).json(newItem);
});

// Get all items
app.get('/items', (req, res) => {
  res.json(inventory);
});

// Get one item
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = inventory.find(item => item.id === itemId);
  if (!item) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    res.json(item);
  }
});

// Update item
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = inventory.findIndex(item => item.id === itemId);
  if (index === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    inventory[index] = { ...inventory[index], ...updatedItem };
    res.json(inventory[index]);
  }
});

// Delete item
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = inventory.findIndex(item => item.id === itemId);
  if (index === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    const deletedItem = inventory.splice(index, 1)[0];
    res.json(deletedItem);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


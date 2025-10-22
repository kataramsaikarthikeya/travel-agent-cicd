const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// In-memory sample data
const travelPackages = [
  {
    id: 1,
    destination: 'Bali, Indonesia',
    duration: '5 nights',
    priceUSD: 899,
  },
  {
    id: 2,
    destination: 'Paris, France',
    duration: '3 nights',
    priceUSD: 1099,
  },
  {
    id: 3,
    destination: 'Kyoto, Japan',
    duration: '6 nights',
    priceUSD: 1499,
  },
  {
    id: 4,
    destination: 'New York, USA',
    duration: '4 nights',
    priceUSD: 799,
  },
];

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Travel Agent App');
});

app.get('/packages', (req, res) => {
  res.json({ packages: travelPackages });
});

app.post('/book', (req, res) => {
  const { name, destination, date } = req.body || {};

  if (!name || !destination || !date) {
    return res.status(400).json({
      error: 'Missing required fields: name, destination, date',
    });
  }

  // In a real app, you would save this to a database
  res.json({
    message: `Booking confirmed for ${name} to ${destination} on ${date}.`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Travel Agent App listening on http://localhost:${PORT}`);
});

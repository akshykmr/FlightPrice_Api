require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const Flight = require('./models/flightsData');

const app = express();
const cors = require('cors');

app.use(cors());
const PORT = process.env.PORT || 3000;

const dbUrl = process.env.DB_URL;


const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbUrl, connectionParams)
  .then(() => {
    console.info('Connected to the Database');
  })
  .catch((e) => {
    console.log('Error:', e);
  });

app.listen(PORT, () => {
  console.log(`Flight API is running on PORT: ${PORT}`);
});


app.get('/flights', async (req, res) => {
    try {
      const flights = await Flight.find();
  
      res.json(flights);
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// app.get('/flights', async (req, res) => {
//   const { source, destination, date } = req.query;

//   try {
//     const flights = await Flight.find({ source, destination, date });

//     res.json(flights.map((flight) => flight.price));
//   } catch (error) {
//     console.log('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


  
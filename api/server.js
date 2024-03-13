
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); 


const app = express();
const port = 3000;
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200', 
  optionsSuccessStatus: 200 
}));

mongoose.connect('mongodb://localhost:27017/UserManagementDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


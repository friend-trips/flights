const express = require('express');
const app = express();
const PORT = 3333;
const path = require('path');
const cors = require('cors');

// MIDDLEWARE
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`)
})
const express = require('express');
//import express from 'express';

require('dotenv').config();

const app = express();
import initWebRoute from './route/web.js';
const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
initWebRoute(app);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
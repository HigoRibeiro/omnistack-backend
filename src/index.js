require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors')


const app = express();


mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true
})

const serve = require('http').createServer(app);
const io = require('socket.io')(serve);

app.use((req, res, next) => {
  req.io = io;
  return next()
})

app.use(cors())
app.use(express.json())
app.use(require('./routes'));

serve.listen(3000, () => {
  console.log('Started')
})
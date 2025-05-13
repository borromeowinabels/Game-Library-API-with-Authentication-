const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose = require ('mongoose');

const authRouter = require('./routes/authRouter');
const postsRouter = require('./routes/postsRouter');
const app = express();


app.use(cors());
app.use(helmet());
app.use (cookieParser());
app.use(express.json());
app.use(express.urlencoded( { extended: true}));

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Database connected");
}) 
.catch(err => {
  console.log(err);
});


app.get('/', (req, res) => {
  res.json({ message: 'server'});
});

app.listen(process.env.PORT, () => {
  console.log('listening..');
});
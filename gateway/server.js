const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/books/api/v1', proxy('books:3002'));
app.use('/users/api/v1', proxy('users:3001'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Gateway is Listening to Port ${port}`);
});

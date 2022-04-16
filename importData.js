const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Book = require('./models/bookModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

const books = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const importData = async () => {
  try {
    await Book.create(books);
    console.log('Data loaded!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Book.deleteMany();
    console.log('Data deleted!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();

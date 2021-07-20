const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Blog = require('./../models/blogModel');
const User = require('./../models/userModel');

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
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Db Connection Successfully');
  });

const blogData = JSON.parse(
  fs.readFileSync(`${__dirname}/data/sample-data.json`, 'utf-8')
);

const userData = JSON.parse(
  fs.readFileSync(`${__dirname}/data/sample-user.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Blog.create(blogData);
    // await User.create(userData);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Blog.deleteMany();
    // await User.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}

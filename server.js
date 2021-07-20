const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('uncaughtException');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('DB Connected Successfully');
  });

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log('Listening to port:' + port);
});


process.on('unhandledRejection', (err) => {
  console.log('unhandledRejection');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
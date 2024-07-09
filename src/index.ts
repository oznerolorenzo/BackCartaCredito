import express from 'express';
import cors from "cors";
import morgan from "morgan";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import creditCardRoutes from './api/routes/router-creditcard';

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/api/credit-cards', creditCardRoutes);

mongoose.set('debug', true);
mongoose.connect('mongodb+srv://lorenzoveronese:encio@databaselorenzo.uwxtppl.mongodb.net/?retryWrites=true&w=majority&appName=DatabaseLorenzo')
  .then(_ => {
    console.log('Connected to db');
    app.listen(8080, () => {
      console.log('Server listening on port 8080');
    });
  })
  .catch(err => {
    console.error(err);
  })

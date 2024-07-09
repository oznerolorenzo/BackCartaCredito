import express from 'express';
import cors from "cors";
import morgan from "morgan";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import creditCardRoutes from './api/routes/router-creditcard';
import dotenv from 'dotenv'; 

dotenv.config();
const app = express();
const mongoURI = process.env.MONGO_URI!

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/api/credit-cards', creditCardRoutes);


mongoose.set('debug', true);
mongoose.connect(mongoURI)
  .then(_ => {
    console.log('Connected to db');
    app.listen(8080, () => {
      console.log('Server listening on port 8080');
    });
  })
  .catch(err => {
    console.error(err);
  })

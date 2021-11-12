import "reflect-metadata";
import express, { Router } from 'express';
import mongoose from "mongoose";
import logger from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ReservationRouter from './api/routes/reservation.router';

// Load environment variables from `.env`
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
// create json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Connect to Database
mongoose.connect(`${process.env.DATABASE_URI}`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(logger("dev"));
app.use(jsonParser);
app.use(urlencodedParser)
// Router initialization and objects
const appRouter: Router = Router();
const reservationRoute = new ReservationRouter(appRouter);

app.get('/', (req, res) => {
  res.send('Express + TypeScript server.');
});
app.use('/api/tables', reservationRoute.router);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

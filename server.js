import express from "express";
import path from "path";
import bodyParser from "body-parser"; 
import newsRouter from './routes/news/news.js';
import usersRouter from './routes/users/users.js';
import queriesRouter from './routes/queries/queries.js';
import dotenv  from "dotenv"; // to load in the environment vars
dotenv.config();
import log from './utlis/log.js'

const app = express(); //creates an express app object
const port = process.env.PORT || 4000; // use env var or default to 4000

app.use(bodyParser.json());

app.use('/news', newsRouter);
app.use('/users', usersRouter);
app.use('/queries', queriesRouter);

//start the server
app.listen(port, () => {
  log(`Back-end Server listening on port ${port}`);
});
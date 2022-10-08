import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';

import {default as laureateRoutes} from "./routes/laureates.router.js";
import {default as prizeRoutes} from "./routes/prize.router.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/laureates', laureateRoutes);
app.use('/prize', prizeRoutes);

app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});

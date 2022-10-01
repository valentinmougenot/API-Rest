import express from "express";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import {default as laureateRoutes} from "./routes/laureates.router.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

const data = JSON.parse(readFileSync("prize.json"));

app.get('/', (req, res) => {
    res.send('Hello express');
});

app.get('/laureates', laureateRoutes);


app.get('/laureate/:id', laureateRoutes);

app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
})

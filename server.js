import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import hbengine from 'express-handlebars';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import {default as laureateRoutes} from "./routes/laureates.router.js";
import {default as prizeRoutes} from "./routes/prize.router.js";
import {default as vueRoutes} from "./routes/vue.router.js";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.engine('hbs', hbengine.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helper: {
        ifeq: function (a, b, options) {
            if (a == b) { return options.fn(this); }
            return options.inverse(this);
        },
        ifnoteq: function (a, b, options) {
            if (a != b) { return options.fn(this); }
            return options.inverse(this);
        }
    }
}));

app.set('view engine', 'hbs');

app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "Prix nobel API",
            description: "API documentation",
            contact: {
                name: "Valentin Mougenot",
            },
            servers: ["http://localhost:3000/"],
        },
    }),
    apis: ["server.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/laureates', laureateRoutes);
app.use('/prize', prizeRoutes);
app.use('/vue', vueRoutes);

app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});

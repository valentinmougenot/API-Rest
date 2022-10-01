import dotenv from "dotenv";
dotenv.config();

import FSLaureate from "../services/laureates.service.js";

export const list = (req, res) => {
    let service = new FSLaureate();
    service.list((error, results) => {
        if (error) {
            res.status(400).send({success: 0, data: error});
        }
        let page = 1;
        let limit = 10;
        if (req.query.page !== undefined) {
            page = req.query.page;
        }
        if (req.query.limit !== undefined) {
            limit = req.query.limit;
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        results = results.slice(startIndex, endIndex);
        return res.status(200).send(results);
    });
}

export const showLaureate = (req, res) => {
    let service = new FSLaureate();
    service.readLaureate(req.params.id, (error, results) => {
        if (error) {
            res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send(results);
    })
}

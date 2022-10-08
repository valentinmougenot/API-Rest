import {listLaureates, readLaureate} from "../services/laureates.service.js";

export const list = (req, res) => {
    listLaureates(req, (error, results) => {
        if (error) {
            res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send(results);
    });
}

export const showLaureate = (req, res) => {
    readLaureate(req.params.id, (error, results) => {
        if (error) {
            res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send(results);
    })
}

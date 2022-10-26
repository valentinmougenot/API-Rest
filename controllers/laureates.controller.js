import {listLaureates, readLaureate, countLaureates, filterLaureates, deleteLaureate, updateLaureate, addLaureate} from "../services/laureates.service.js";

export const list = (req, res) => {
    listLaureates(req, (error, results) => {
        if (error) {
            res.status(400).send({success: 0, data: error});
        }

        return res.status(200).send({laureates: results});
    });
}

export const count = (req, res) => {
    countLaureates((error, result) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: result});
    })
}

export const filter = (req, res) => {
    filterLaureates(req, (error, results) => {
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

export const delLaureate = (req, res) => {
    deleteLaureate(req.params.id, (error, results) => {
        if (error) {
            res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send(results);
    })
}

export const updLaureate = (req, res) => {
    updateLaureate(req, (error, results) => {
        if (error) {
            res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send(results);
    })
}

export const adLaureate = (req, res) => {
    addLaureate(req, (error, results) => {
        if (error) {
            res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send(results);
    })
}
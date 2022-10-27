import fs from "fs";

const dataJSON = JSON.parse(fs.readFileSync("prize.json").toString());

export const checkYear = (req, res, next) => {
    if (!dataJSON.find((element) => element.year === req.body.year)) {
        return res.status(400).send({success: 0, data: "Invalid year"});
    }
    next();
}

export const checkName = (req, res, next) => {
    if (req.body.firstname.length < 3 || req.body.surname.length < 3) {
        return res.status(400).send({success: 0, data: "Firstname and surname must be at least 3 characters long"});
    }
    next();
}

export const checkMotivation = (req, res, next) => {
    if (req.body.motivation === "") {
        return res.status(400).send({success: 0, data: "Motivation cannot be empty"});
    }
    next();
}

export const validateAdd = (req, res, next) => {
    if (!dataJSON.find((element) => element.year === req.body.year)) {
        return res.status(400).send({success: 0, data: "Invalid year"});
    }
    if (req.body.firstname.length < 3 || req.body.surname.length < 3) {
        return res.status(400).send({success: 0, data: "Firstname and surname must be at least 3 characters long"});
    }
    if (req.body.motivation === "") {
        return res.status(400).send({success: 0, data: "Motivation cannot be empty"});
    }
    next();
}

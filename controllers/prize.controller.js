import {countPrize, getMultipleNobel, getCategories, getBestCategory, getNobelsYears, getPrizesId, getNoNobelYears, getNobelsByYearSorted} from '../services/prize.service.js';

export const count = (req, res) => {
    countPrize((error, result) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: result});
    })
}

export const multipleNobels = (req, res) => {
    getMultipleNobel((error, result) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: result});
    })
}

export const categories = (req, res) => {
    getCategories((error, result) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: result});
    })
}

export const bestCategory = (req, res) => {
    getBestCategory((error, result) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: result});
    })
}

export const nobelsYears = (req, res) => {
    getNobelsYears((error, result) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: result});
    })
}

export const prizesId = (req, res) => {
    getPrizesId(req.params.id, (error, result) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: result});
    })
}

export const noNobelYears = (req, res) => {
    getNoNobelYears((error, result) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: result});
    })
}

export const nobelsByYearSorted = (req, res) => {
    getNobelsByYearSorted(req.query.sort, (error, result) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: result});
    })
}
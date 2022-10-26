import { getLaureatesByCategory, getCateg, addLaureate } from "../services/vue.service.js";
import {checkYear, checkName, checkMotivation} from "../middlewares/validatorAdd.js";

export const laureatesByCategory = (req, res) => {
    getLaureatesByCategory(req, (error, results) => {
        if (error) {
            res.status(400).send({success: 0, data: error});
        }
        return res.status(200).render('show', {laureates: results.result, categories: results.categories});
    })
}

export const showAddLaureate = (req, res) => {
    getCateg((error, results) => {
        if (error) {
            res.status(400).send({success: 0, data: error});
        }
        return res.status(200).render('add', {categories: results});
    })
}

export const addLaur = (req, res, next) => {
    if (checkYear(req, res, next) && checkName(req, res, next) && checkMotivation(req, res, next)) {
        addLaureate(req, (error, results) => {
            if (error) {
                res.status(400).send({success: 0, data: error});
            }
            return res.status(200).redirect('/vue?category=' + results.category);
        })
    }
}
import {getLaureatesByCategory, getCateg, addLaureate} from "../services/vue.service.js";

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

export const addLaur = (req, res) => {
    addLaureate(req, (error, results) => {
        if (error) {
            res.status(400).send({success: 0, data: error});
        }
        return res.status(200).redirect('/vue?category=' + results.category);
    })
}
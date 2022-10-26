import express from "express";
const router = express.Router();

import {laureatesByCategory, showAddLaureate, addLaur} from "../controllers/vue.controller.js";

router.get('/', laureatesByCategory);
/**
 * @swagger
 * /vue/show:
 *     get:
 *         description: Get all laureates by category
 *         tags:
 *            - vue
 *         parameters:
 *            - in: query
 *              description: Category of the laureates
 *              name: category
 *              required: false
 *              type: string
 *         responses:
 *            '200':
 *                 description: Success
 *            '400':
 *                 description: Bad request
 *            '500':
 *                 description: Internal server error
 */

router.get('/add', showAddLaureate);
/**
 * @swagger
 * /vue/add:
 *     get:
 *         description: Get the view to add a laureate
 *         tags:
 *            - vue
 *         responses:
 *            200:
 *                 description: Success
 *            400:
 *                 description: Bad request
 *            500:
 *                 description: Internal server error
 */

router.post('/', addLaur);
/**
 * @swagger
 * /vue/add:
 *      post:
 *          description: Use to add a laureate
 *          tags:
 *               - vue
 *          parameters:
 *               - in: body
 *                 name: Laureate
 *                 description: Laureate object
 *                 schema:
 *                     type: object
 *                     required:
 *                         - firstname
 *                         - surname
 *                         - year
 *                         - category
 *                     properties:
 *                         firstname:
 *                             type: string
 *                             minLength: 1
 *                             maxLength: 45
 *                             example: James
 *                         surname:
 *                             type: string
 *                             minLength: 1
 *                             maxLength: 45
 *                             example: Bond
 *                         year:
 *                             type: string
 *                             minimum: 1901
 *                             maximum: 2021
 *                             example: 2018
 *                         category:
 *                             type: string
 *                             minLength: 1
 *                             maxLength: 45
 *                             example: physics
 *          responses:
 *              '200':
 *                  description: A laureate added successfully
 *              '400':
 *                  description: Bad request
 *              '500':
 *                  description: Internal server error
 */

export default router;
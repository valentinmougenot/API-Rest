import express from "express";
const router = express.Router();

import {list, showLaureate, count, filter, delLaureate, updLaureate, adLaureate} from "../controllers/laureates.controller.js";

router.get('/', list);
/**
 * @swagger
 * /laureates:
 *      get:
 *          description: Use to request all laureates
 *          tags:
 *              - laureates
 *          parameters:
 *              - in: query
 *                name: page
 *                description: The page number
 *                required: false
 *                type: integer
 *              - in: query
 *                name: limit
 *                description: The number of laureates per page
 *                required: false
 *                type: integer  
 *          responses:
 *              '200':
 *                  description: A laureate
 *              '400':
 *                  description: Bad request
 *              '500':
 *                  description: Internal server error
 */

router.get('/count', count);
/**
 * @swagger
 * /laureates/count:
 *      get:
 *          description: Use to request the number of laureates
 *          tags:
 *              - laureates
 *          responses:
 *              '200':
 *                  description: The number of laureates
 *              '400':
 *                  description: Bad request
 *              '500':
 *                  description: Internal server error
 */

router.get('/filter', filter);
/**
 * @swagger
 * /laureates/filter:
 *      get:
 *          description: Use to request laureates filtered by year, category or country
 *          tags:
 *              - laureates
 *          parameters:
 *              - in: query
 *                name: year
 *                description: year of the prize
 *                required: false
 *                type: integer
 *              - in: query
 *                name: category
 *                description: category of the prize
 *                required: false
 *                type: integer
 *              - in: query
 *                name: country
 *                description: country of the laureate
 *                required: false
 *                type: string
 *          responses:
 *              '200':
 *                  description: A list of laureates
 *              '400':
 *                  description: Bad request
 *              '500':
 *                  description: Internal server error
 */
router.get('/:id', showLaureate);
/**
 * @swagger
 * /laureates/{id}:
 *      get:
 *          description: Use to request a laureate
 *          tags:
 *              - laureates
 *          parameters:
 *              - in: path
 *                name: id
 *                description: id of the laureate
 *                required: true
 *                type: integer
 *          responses:
 *              '200':
 *                  description: A laureate
 *              '400':
 *                  description: Bad request
 *              '500':
 *                  description: Internal server error
 */
router.delete('/:id', delLaureate);
/**
 * @swagger
 * /laureates/{id}:
 *      delete:
 *          description: Use to delete a laureate
 *          tags:
 *              - laureates
 *          parameters:
 *              - in: path
 *                name: id
 *                description: id of the laureate
 *                required: true
 *                type: integer
 *          responses:
 *              '200':
 *                  description: A laureate deleted successfully
 *              '400':
 *                  description: Bad request
 *              '500':
 *                  description: Internal server error
 */
router.put('/:id', updLaureate);
/**
 * @swagger
 * /laureates/{id}:
 *      put:
 *          description: Use to update the motivation of a laureate
 *          tags:
 *              - laureates
 *          parameters:
 *              - in: path
 *                name: id
 *                description: id of the laureate
 *                required: true
 *                type: integer
 *              - in: body
 *                name: Motivation
 *                description: Motivation object
 *                schema:
 *                     type: object
 *                     required:
 *                         - motivation
 *                     properties:
 *                         motivation:
 *                             type: string
 *                             minLength: 1
 *                             maxLength: 45
 *                             example: for their discoveries concerning the structural and functional organization of the cell
 *          responses:
 *              '200':
 *                  description: A laureate updated successfully
 *              '400':
 *                  description: Bad request
 *              '500':
 *                  description: Internal server error
 */
router.post('/', adLaureate);
/**
 * @swagger
 * /laureates:
 *      post:
 *          description: Use to add a laureate
 *          tags:
 *              - laureates
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
import express from "express";
const router = express.Router();

import {list, showLaureate, count, filter, delLaureate, updLaureate, adLaureate} from "../controllers/laureates.controller.js";

router.get('/', list);
/**
 * @swagger
 * /laureates:
 *      get:
 *          description: Use to request all laureates (F1)
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
 *          description: Use to request the number of laureates (F4)
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
 *          description: Use to request laureates filtered by firstname, surname or category (F12)
 *          tags:
 *              - laureates
 *          parameters:
 *              - in: query
 *                name: firstname
 *                description: firstname of the laureate
 *                required: false
 *                type: string
 *              - in: query
 *                name: surname
 *                description: surname of the laureate
 *                required: false
 *                type: string
 *              - in: query
 *                name: category
 *                description: category of the laureate
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
 *          description: Use to request a laureate (F2)
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
router.delete('/', delLaureate);
/**
 * @swagger
 * /laureates:
 *      delete:
 *          description: Use to delete a laureate (F13)
 *          tags:
 *              - laureates
 *          parameters:
 *               - in: body
 *                 name: Laureate
 *                 description: Laureate object
 *                 schema:
 *                     type: object
 *                     required:
 *                         - id
 *                         - year
 *                         - category
 *                     properties:
 *                         id:
 *                             type: integer
 *                             example: 1007
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
 *                  description: A laureate deleted successfully
 *              '400':
 *                  description: Bad request
 *              '500':
 *                  description: Internal server error
 */
router.put('/', updLaureate);
/**
 * @swagger
 * /laureates:
 *      put:
 *          description: Use to update the motivation of a laureate (F14)
 *          tags:
 *              - laureates
 *          parameters:
 *               - in: body
 *                 name: Laureate
 *                 description: Laureate object
 *                 schema:
 *                     type: object
 *                     required:
 *                         - id
 *                         - year
 *                         - category
 *                         - motivation
 *                     properties:
 *                         id:
 *                             type: integer
 *                             example: 1007
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
 *                         motivation:
 *                             type: string
 *                             minLength: 1
 *                             maxLength: 255
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
 *          description: Use to add a laureate (F15)
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
 *                         - motivation
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
 *                         motivation:
 *                             type: string
 *                             minLength: 1
 *                             maxLength: 255
 *                             example: for their discoveries concerning the structural and functional organization of the cell
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
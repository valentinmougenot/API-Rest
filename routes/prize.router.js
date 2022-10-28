import express from "express";
import {count, multipleNobels, categories, bestCategory, nobelsYears, prizesId, noNobelYears, nobelsByYearSorted} from "../controllers/prize.controller.js";

var router = express.Router();

router.get("/count", count);
/**
 * @swagger
 * /prize/count:
 *      get:
 *          description: Use to request the number of nobels (F3)
 *          tags:
 *             - prize
 *          responses:
 *              '200':
 *                  description: The number of nobels
 *              '400':
 *                  description: Bad request
 *              '500':
 *                  description: Internal server error
 */
router.get("/multiple-nobels", multipleNobels);
/**
 * @swagger
 * /prize/multiple-nobels:
 *     get:
 *         description: Use to request laureates with multiple nobels (F5)
 *         tags:
 *             - prize
 *         responses:
 *             '200':
 *                 description: A list of laureates with multiple nobels
 *             '400':
 *                 description: Bad request
 *             '500':
 *                 description: Internal server error
 */
router.get("/categories", categories);
/**
 * @swagger
 * /prize/categories:
 *     get:
 *         description: Use to request the categories of nobels (F6)
 *         tags:
 *             - prize
 *         responses:
 *             '200':
 *                 description: A list of categories
 *             '400':
 *                 description: Bad request
 *             '500':
 *                 description: Internal server error
 */
router.get("/best-category", bestCategory);
/**
 * @swagger
 * /prize/best-category:
 *      get:
 *          description: Use to request the category with the most nobels (F7)
 *          tags:
 *             - prize
 *          responses:
 *              '200':
 *                  description: The category with the most nobels
 *              '400':
 *                  description: Bad request
 *              '500':
 *                  description: Internal server error
 */

router.get("/nobels-years", nobelsYears);
/**
 * @swagger
 * /prize/nobels-years:
 *     get:
 *         description: Use to request the nobels by year (F8)
 *         tags:
 *             - prize
 *         responses:
 *             '200':
 *                 description: A list of nobels by year
 *             '400':
 *                 description: Bad request
 *             '500':
 *                 description: Internal server error
 */
router.get("/no-nobel-years", noNobelYears);
/**
 * @swagger
 * /prize/no-nobel-years:
 *     get:
 *         description: Use to request the years without nobels (F10)
 *         tags:
 *             - prize
 *         responses:
 *             '200':
 *                 description: A list of years without nobels
 *             '400':
 *                 description: Bad request
 *             '500':
 *                 description: Internal server error
 */
router.get("/nobels-by-year", nobelsByYearSorted);
/**
 * @swagger
 * /prize/nobels-by-year:
 *     get:
 *         description: Use to request the nobels by year sorted (F11)
 *         tags:
 *             - prize
 *         parameters:
 *             - in: query
 *               name: sort
 *               description: sort by year or nobels (+laureates = ascending, -laureates = descending)
 *               required: false
 *         responses:
 *             '200':
 *                 description: A list of laureates
 *             '400':
 *                 description: Bad request
 *             '500':
 *                 description: Internal server error
 */
router.get("/:id", prizesId);
/**
 * @swagger
 * /prize/{id}:
 *     get:
 *         description: Use to request every prize with the given laureate id (F9)
 *         tags:
 *             - prize
 *         parameters:
 *             - in: path
 *               name: id
 *               description: id of the prize
 *               required: true
 *         type: integer
 *         responses:
 *             '200':
 *                 description: A list of prizes
 *             '400':
 *                 description: Bad request
 *             '500':
 *                 description: Internal server error
 */

export default router; 
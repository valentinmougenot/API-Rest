import express from "express";
import {count, duplicateNobels, categories, bestCategory, bestYear, nobelsYears, prizesId, noNobelYears, nobelsByYearSorted} from "../controllers/prize.controller.js";

var router = express.Router();

router.get("/count", count);
router.get("/duplicate-nobels", duplicateNobels);
router.get("/categories", categories);
router.get("/best-category", bestCategory);
router.get("/best-year", bestYear);
router.get("/nobels-years", nobelsYears);
router.get("/no-nobel-years", noNobelYears);
router.get("/nobels-by-year", nobelsByYearSorted);
router.get("/:id", prizesId);

export default router; 
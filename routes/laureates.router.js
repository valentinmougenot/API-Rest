import express from "express";
import {list, showLaureate} from "../controllers/laureates.controller.js";

var router = express.Router();
// localhost:3000/users/
router.get("/laureates", list);
router.get("/laureate/:id", showLaureate);

export default router; 
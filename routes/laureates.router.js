import express from "express";
const router = express.Router();

import {list, showLaureate} from "../controllers/laureates.controller.js";

router.get('/', list);
router.get('/:id', showLaureate);

export default router; 
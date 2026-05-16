import express from "express";
import { inicio } from "../controllers/autorController.js";

const autorRouter = express.Router();

//Routing
autorRouter.get('/inicio', inicio)


export default autorRouter
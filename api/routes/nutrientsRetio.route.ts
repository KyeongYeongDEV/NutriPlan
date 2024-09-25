import { Router } from "express"
import Container from "typedi";
import NutrientsRetioController from "../controllers/nutrientsRetio.controller";

export default ({ app } : { app : Router }) => {
    const route = Router();

    app.use('/nutrientsRetio', route);

    route.get("/:u_id", Container.get(NutrientsRetioController).calculateMacronutrientRatioForDay.bind(NutrientsRetioController));
}
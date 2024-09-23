import Router from "express";
import dietPlan from "./routes/dietPlan.route";

export default () => {
    const router= Router();
    
    dietPlan({ app : router});

    return router;
}
import { Inject, Service } from "typedi";
import Repository from "./index.repository";
import mysql from 'mysql2/promise'
import FoodInfoResDTO from "../dto/response/foodInfo";
import DietplanResDTO from "../dto/response/dietPlan";

@Service()
export default class DietPlanRepository extends Repository{
    constructor( @Inject('pool') pool : mysql.Pool){
        super(pool);
    }

    async findFoodInfoById({ id } : { id : number }) : Promise<FoodInfoResDTO> {
        const query = 'SELECT * FROM foodInfo WHERE id = ?';
        const result = await this.executeQuery(query, [id]);

        return result as FoodInfoResDTO;
    }

    async findDietPlanByDate( { date } : { date : string }) : Promise<DietplanResDTO> {
        const query = 'SELECT * FROM userDietplan WHERE date = ?';
        const result  = await this.executeQuery(query, [date]);

        return result as DietplanResDTO;
    }
}
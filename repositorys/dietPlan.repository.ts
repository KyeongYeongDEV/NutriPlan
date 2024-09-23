import { Inject, Service } from "typedi";
import Repository from "./index.repository";
import mysql from 'mysql2/promise'
import FoodInfoResDTO from "../dto/response/foodInfo";
import DietplanDTO from "../dto/response/dietPlan";

@Service()
export default class DietPlanRepository extends Repository{
    constructor( @Inject('pool') pool : mysql.Pool){
        super(pool);
    }

    async findFoodInfoById({ id } : { id : number }) : Promise<FoodInfoResDTO> {
        const query : string = 'SELECT * FROM foodInfo WHERE id = ?';
        const result : FoodInfoResDTO= await this.executeQuery(query, [id]);

        return result;
    }

    async findDietPlanByDate( { date } : { date : string }) : Promise<DietplanDTO[]> {
        const query : string = 'SELECT * FROM userDietplan WHERE date = ?';
        const result : DietplanDTO[]  = await this.executeQuery(query, [date]);

        return result;
    }
}
import { Inject, Service } from "typedi";
import Repository from "./index.repository";
import mysql from 'mysql2/promise'
import FoodInfoResDTO from "../dto/response/foodInfo";

@Service()
export default class FoodInfoRepository extends Repository{
    constructor( @Inject('pool') pool : mysql.Pool){
        super(pool);
    }
    //[ ] CRUD
    async findFoodInfoById({ id } : { id : number }) : Promise<FoodInfoResDTO> {
        const query : string = 'SELECT * FROM foodInfo WHERE id = ?';
        const result : FoodInfoResDTO= await this.executeQuery(query, [id]);

        return result;
    }

    async deleteFoodInfoById( { id } : { id : number }) {
        const query = 'DELETE FROM foodInfo WHERE = ?';
        
        await this.executeQuery(query, [id]);
    }
}
import { Inject, Service } from "typedi";
import Repository from "./index.repository";
import mysql from 'mysql2/promise'
import DietplanDTO from "../dto/response/dietPlan";
import DietPlanRequestDTO from "../dto/request/dietPlan";

@Service()
export default class DietPlanRepository extends Repository{
    constructor( @Inject('pool') pool : mysql.Pool){
        super(pool);
    }
    //[ ] 조회 삭제
    async findDietPlanByDate( { date } : { date : DietPlanRequestDTO }) : Promise<DietplanDTO[]> {
        const query : string = "SELECT * FROM userDietplan WHERE date = ?";
        const result : DietplanDTO[]  = await this.executeQuery(query, [date.date]);
        

        return result;
    }

    async deleteDietPlanById( { id } : { id : number }) {
        const query : string = 'DELETE FROM userDietplan WHERE id = ?'
        await this.executeQuery(query, [id]);
    }   
}
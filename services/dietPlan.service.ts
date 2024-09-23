import { Inject, Service } from "typedi";
import DietPlanResDTO from "../dto/response/dietPlan";
import DietPlanRepository from "../repositorys/dietPlan.repository";

@Service()
export default class DietPlanService {
    constructor(
        @Inject( () => DietPlanRepository) private readonly  dietPlanRepository :DietPlanRepository
    ){}

    async findFoodInfoByDate( { date } : { date : string }) : Promise<DietPlanResDTO[]> {

        try {
            const dietPlans : DietPlanResDTO[] = await this.dietPlanRepository.findFoodInfoById()
        } catch (error) {
            console.error(error);
        }
    }
}
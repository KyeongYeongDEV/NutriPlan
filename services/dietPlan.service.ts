import { Inject, Service } from "typedi";
import { DietPlanResponseDTO } from "../dto/response/dietPlan";
import DietPlanDTO from "../dto/response/dietPlan";


import DietPlanRepository from "../repositorys/dietPlan.repository";
import FoodInfoDTO, { FoodInfoResponseDTO } from "../dto/response/foodInfo";

@Service()
export default class DietPlanService {
    constructor(
        @Inject( () => DietPlanRepository) private readonly  dietPlanRepository :DietPlanRepository
    ){}

    async findFoodInfoById( { id } : { id : number }) : Promise<FoodInfoResponseDTO> {
        const foodInfo : FoodInfoDTO = await this.dietPlanRepository.findFoodInfoById({id});

        const foodInfoResponseDTO : FoodInfoResponseDTO = {
            statusCode : 200,
            message : '성공적으로 조회했습니다',
            data : foodInfo
        }

        return foodInfoResponseDTO;
    }

    async findFoodInfoByDate( { date } : { date : string }) : Promise<DietPlanResponseDTO> {
        const dietPlans : DietPlanDTO[] = await this.dietPlanRepository.findDietPlanByDate({date});

        const dietPlanResponseDTO : DietPlanResponseDTO = {
            statusCode : 200,
            message : '성공적으로 조회했습니다',
            data : dietPlans
        }
        return dietPlanResponseDTO;
    }
}
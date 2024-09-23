import { Inject, Service } from "typedi";
import { DeleteDietPlanResponseDTO, DietPlanResponseDTO } from "../dto/response/dietPlan";
import DietPlanDTO from "../dto/response/dietPlan";


import DietPlanRepository from "../repositorys/dietPlan.repository";
import DietPlanRequestDTO from "../dto/request/dietPlan";

@Service()
export default class DietPlanService {
    constructor(
        @Inject( () => DietPlanRepository) private readonly  dietPlanRepository :DietPlanRepository
    ){}

    async findDietPlanByDate( { date } : { date : DietPlanRequestDTO }) : Promise<DietPlanResponseDTO> {
        console.log(date)
        const dietPlans : DietPlanDTO[] = await this.dietPlanRepository.findDietPlanByDate({date});

        const dietPlanResponseDTO : DietPlanResponseDTO = {
            statusCode : 200,
            message : '성공적으로 조회했습니다',
            data : dietPlans
        }
        return dietPlanResponseDTO;
    }

    async deleteDietPlanById( { id } : { id : number }) : Promise<DeleteDietPlanResponseDTO>{
        await this.dietPlanRepository.deleteDietPlanById({ id });

        return {
            message : '삭제가 완료되었습니다',
            statusCode : 200,
        }
    }
}
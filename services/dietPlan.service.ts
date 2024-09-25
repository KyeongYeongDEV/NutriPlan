import { Inject, Service } from "typedi";
import { DeleteDietPlanResponseDTO, DietPlanResponseDTO } from "../dto/response/dietPlan";
import DietPlanDTO from "../dto/response/dietPlan";
import DietPlanRepository from "../repositorys/dietPlan.repository";

@Service()
export default class DietPlanService {
    constructor(
        @Inject( () => DietPlanRepository) private readonly  dietPlanRepository :DietPlanRepository
    ){} 

    async findDietPlanByDateAndUid( { date, u_id } : { date : string, u_id : number }) : Promise<DietPlanResponseDTO> {
        const dietPlans : DietPlanDTO[] = await this.dietPlanRepository.findDietPlanByDateAndUid({date, u_id});

        //TODO : 조건문 사용해 값을 못 받아온 경우 처리하기

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
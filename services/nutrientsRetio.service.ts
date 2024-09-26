import { Inject, Service } from "typedi";
import FoodInfoDTO from "../dto/response/foodInfo";
import { MacronutrientRatioDTO, MacronutrientRatioResponseDTO } from "../dto/response/nutrientRatio"; 
import DietPlanRepository from "../repositorys/dietPlan.repository";
import FoodInfoRepository from "../repositorys/foodInfo.repository";

@Service()
export class NutrientsRetioServie {
    constructor(
        @Inject( () => FoodInfoRepository ) private readonly foodInfoRepository : FoodInfoRepository,
        @Inject( () => DietPlanRepository ) private readonly dietPlanRepository : DietPlanRepository
    ){}
    private async getFoodInfoIdsByUidAndDate({ u_id, date } : { u_id: number, date : string }): Promise<number[]> {
        const dietPlan = await this.dietPlanRepository.findDietPlanByDateAndUid({date, u_id});

        let foodIds : number[]= [];
        if (dietPlan !== undefined) {// food_id 값만 추출하여 배열로 저장
            foodIds = dietPlan.map(item => item.food_id);
        }

        return foodIds
    }

    async calculateMacronutrientRatioForDay({ u_id, date } : { u_id: number, date : string }): Promise<MacronutrientRatioResponseDTO> {
        const foodInfoIds :  number[] = await this.getFoodInfoIdsByUidAndDate({ u_id, date });
        let carbohydrate : number = 0;
        let protein : number = 0;
        let fat : number = 0;
        let kcal : number = 0;

        for(const f_id of foodInfoIds){
            const foodInfo : FoodInfoDTO = await this.foodInfoRepository.findFoodInfoById({ f_id });
            carbohydrate += Number(foodInfo.carbohydrate);
            protein += Number(foodInfo.protein);
            fat += Number(foodInfo.fat);
            kcal += Number(foodInfo.kcal)
        }

        const total = carbohydrate + protein + fat;

        const macronutrientRatio : MacronutrientRatioDTO = {
            date : date ,
            carbohydrate : Math.round(carbohydrate / total * 100),
            protein : Math.round(protein / total * 100),
            fat : Math.round(fat / total * 100),
            kcal : kcal
        };

        const macronutrientRatioResponseDTO : MacronutrientRatioResponseDTO = {
            statusCode : 200,
            message : '계산을 완료했습니다',
            data : macronutrientRatio
        }

        return macronutrientRatioResponseDTO;
    }
    
    // async calculateMacronutrientRatioForWeek({ u_id, date } : { u_id: number, date : DietPlanRequestDTO }): Promise<> {
    //     // u_id에 따른 주간 권장 탄단지 비율 계산 로직
    //     //calculateMacronutrientRatioForDay 얘를 주회해야 하는 날짜만큼 돌린면 됨
    // }
    
}
import { Inject, Service } from "typedi";
import FoodInfoDTO from "../dto/response/foodInfo";
import { MacronutrientRatioResponseDTO } from "../dto/response/nutrientRatio"; 
import DietPlanRepository from "../repositorys/dietPlan.repository";
import FoodInfoRepository from "../repositorys/foodInfo.repository";
import DietplanDTO from "../dto/response/dietPlan";
import { EachKcal, MacronutrientRatio, DailyMacronutrientSummary } from "../types/nutrient.type";
import UserRepository from "../repositorys/user.repository";
import UserDTO from "../dto/response/user";
import DietPlanRequestDTO from "../dto/request/dietPlan";

@Service()
export class NutrientsRetioServie {
    constructor(
        @Inject( () => FoodInfoRepository ) private readonly foodInfoRepository : FoodInfoRepository,
        @Inject( () => DietPlanRepository ) private readonly dietPlanRepository : DietPlanRepository,
        @Inject( () => UserRepository ) private readonly userRepository : UserRepository
    ){}
    //map으로 food_id만 뽑아주는 함수
    private getFoodInfoIdsByUidAndDate({ dietPlan } : { dietPlan : DietplanDTO[] }): number[] {
        let foodIds : number[]= [];
        if (dietPlan !== undefined) {// food_id 값만 추출하여 배열로 저장
            foodIds = dietPlan.map(item => item.food_id);
        }

        return foodIds
    }
    //아점저 별로 섭취한 칼로리 계산해주는 함수
    private async getEachKcal({ dietPlan } : { dietPlan : DietplanDTO[] }): Promise<EachKcal> {
        let morningKcal : number = 0;
        let lunchKcal : number = 0;
        let dinnerKcal : number = 0;

        for(const plan of dietPlan) {
            let f_id = plan.food_id;
            const foodInfo : FoodInfoDTO = await this.foodInfoRepository.findFoodInfoById({ f_id });

            if(plan.mealTime === 1) {
                morningKcal += foodInfo.kcal;
            } else if (plan.mealTime === 2) {
                lunchKcal += foodInfo.kcal;
            } else {
                dinnerKcal += foodInfo.kcal;
            }
        }

        const result : EachKcal = {
            morning : morningKcal,
            lunch : lunchKcal,
            dinner : dinnerKcal
        }

        return result;
    }

    private async Macronutrient({ dietPlan } : { dietPlan : DietplanDTO[] }) : Promise<MacronutrientRatio>{
        const foodInfoIds :  number[] = this.getFoodInfoIdsByUidAndDate({ dietPlan });
        let carbohydrate : number = 0;
        let protein : number = 0;
        let fat : number = 0;

        for(const f_id of foodInfoIds){
            const foodInfo : FoodInfoDTO = await this.foodInfoRepository.findFoodInfoById({ f_id });
            carbohydrate += Number(foodInfo.carbohydrate);
            protein += Number(foodInfo.protein);
            fat += Number(foodInfo.fat);
        }

        const result : MacronutrientRatio = {
            carbohydrate : Math.round(carbohydrate),
            protein : Math.round(protein),
            fat : Math.round(fat),
        };

        return result;
    }

    async evaluateMacronutrientIntakeForDay({ u_id, date } : { u_id : number, date : string}) : Promise<DailyMacronutrientSummary>{
        //섭취한 영양 + 유저의 기초대사량
        const dietPlan : DietplanDTO[]= await this.dietPlanRepository.findDietPlanByDateAndUid({date, u_id});
        const macronutrient : MacronutrientRatio = await this.Macronutrient({ dietPlan })
        const userInfo : UserDTO = await this.userRepository.getUserInfoByUid({u_id});
        const userBmr = userInfo.bmr;
        
        const tdee : number =  userBmr * 1.375; // 활동칼로리 - 가벼운 운동(주1-3회)을 기준

        // 5:2:3 이 적정 비율
        const totalCarbohydrate = Math.round(tdee * 0.5 / 4);
        const totalProtein = Math.round(tdee * 0.2 / 4);
        const totalFat = Math.round(tdee * 0.3 / 9);
        
        const reaultCarbohydrate : string = macronutrient.carbohydrate < totalCarbohydrate ? "탄수화물이 부족합니다" : "탄수화물이 충분합니다";
        const resultProtein : string = macronutrient.protein < totalProtein ? "단백질이 부족합니다" : "단백질이 충분합니다";
        const resultFat : string = macronutrient.fat < totalFat ? "지방이 부족합니다" : "지방이 충분합니다.";

        const dailyMacronutrientSummary : DailyMacronutrientSummary = {
            macronutrientRecommendation : {
                carbohydrate : totalCarbohydrate,
                protein : totalProtein,
                fat : totalFat
            },
            intakeMacronutrient : {
                carbohydrate : macronutrient.carbohydrate,
                protein : macronutrient.protein,
                fat : macronutrient.fat
            },
            result :  {
                carbohydrate : reaultCarbohydrate,
                protein : resultProtein,
                fat : resultFat
            }
        }

        return dailyMacronutrientSummary;
    }
    
    async calculateMacronutrientRatioForDay({ u_id, date } : { u_id: number, date : string }): Promise<MacronutrientRatioResponseDTO> {
        const dietPlan : DietplanDTO[]= await this.dietPlanRepository.findDietPlanByDateAndUid({date, u_id});
        
        const eachKcal : EachKcal = await this.getEachKcal({ dietPlan })
        const macronutrient =  await this.Macronutrient({ dietPlan } )

        const total = macronutrient.carbohydrate + macronutrient.protein + macronutrient.fat;

        const macronutrientRatio : MacronutrientRatio = {
            carbohydrate : Math.round(macronutrient.carbohydrate / total * 100),
            protein : Math.round(macronutrient.protein / total * 100),
            fat : Math.round(macronutrient.fat / total * 100),
        };


        const macronutrientRatioResponseDTO : MacronutrientRatioResponseDTO = {
            statusCode : 200,
            message : '계산을 완료했습니다',
            data : {
                date : date,
                macronutrientRatio :  macronutrientRatio, 
                eachKcal : eachKcal
            }
        }

        return macronutrientRatioResponseDTO;
    }
    
    // async calculateMacronutrientRatioForWeek({ u_id, date } : { u_id: number, date : string }): Promise<> {
    //     // u_id에 따른 주간 권장 탄단지 비율 계산 로직
    //     //calculateMacronutrientRatioForDay 얘를 주회해야 하는 날짜만큼 돌린면 됨

    // }
    
}
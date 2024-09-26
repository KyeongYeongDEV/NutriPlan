import { CommonResponseDTO } from ".";

export interface MacronutrientRatioDTO { //탄단지 비율을 %로 해서 보냄
    date : string;
    carbohydrate : number;
    protein : number;
    fat : number;
    kcal : number;
}

export interface MacronutrientRatioResponseDTO extends CommonResponseDTO<MacronutrientRatioDTO>{}
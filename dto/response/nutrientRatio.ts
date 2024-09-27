import { CommonResponseDTO } from ".";
import { EachKcal, MacronutrientRatio } from "../../types/nutrient.type";

export interface MacronutrientRatioDTO { //탄단지 비율을 %로 해서 보냄
    date : string;
    macronutrientRatio : MacronutrientRatio;
    eachKcal : EachKcal;
}

export interface MacronutrientRatioForWeekDTO { 
    date : string;
    macronutrient : MacronutrientRatio;
    macronutrientRatio : MacronutrientRatio;
    eachKcal : EachKcal;
}

export interface MacronutrientRatioResponseDTO extends CommonResponseDTO<MacronutrientRatioDTO>{}
export interface MacronutrientRatioForWeekResponseDTO extends CommonResponseDTO<MacronutrientRatioForWeekDTO>{}
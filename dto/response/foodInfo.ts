import { CommonResponseDTO } from ".";

export default interface FoodInfoDTO {
    id : number;
    foodName : string;
    kcal : number;
    carbohydrate : number;
    protein : number;
    fat : number;
    category : string
}


export interface FoodInfoResponseDTO extends CommonResponseDTO<FoodInfoDTO>{}
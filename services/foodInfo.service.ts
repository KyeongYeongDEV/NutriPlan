// import { Request, Response ,NextFunction } from "express";
// import { Inject, Service } from "typedi";
// import FoodInfoRequestDTO from "../../dto/request/foodInfo";
// import { FoodInfoResponseDTO } from "../../dto/response/foodInfo";
// import DietPlanService from "../../services/dietPlan.service";

// @Service()
// export class  {
//     constructor(
//         @Inject( () => DietPlanService ) private readonly dietPlanService : DietPlanService
//     ){}

//     findFoodInfoById = async (req : Request, res : Response, next : NextFunction) => {
//         try {
//             //TODO: unknown 없애도록 수정할 것
//             const id = req.body as FoodInfoRequestDTO ;

//             if(id === undefined){
//                 throw new Error("data is undefinded");
//             }
//             const foodInfoResponseDTO : FoodInfoResponseDTO = await this.dietPlanService.findFoodInfoById({id});

//             return res.status(200).json(foodInfoResponseDTO);
//         } catch (error) {
//             return next(error);
//         }
//     }
// }
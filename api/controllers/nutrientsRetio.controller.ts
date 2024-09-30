import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import { MacronutrientRatioForDayResponseDTO, MacronutrientRatioResponseDTO } from "../../dto/response/nutrientRatio";
import { NutrientsRetioServie } from "../../services/nutrientsRetio.service";

@Service()
export default class NutrientsRetioController {
    constructor(
        @Inject( () => NutrientsRetioServie ) private readonly nutrientsRetioServie : NutrientsRetioServie
    ){}

    calculateMacronutrientRatioForDay = async (req : Request, res : Response, next : NextFunction) => {
        const u_id : number = parseInt(req.params.u_id);
        const date : string = req.body.date;
        const macronutrientRatioResponseDTO : MacronutrientRatioResponseDTO = await this.nutrientsRetioServie.calculateMacronutrientRatioForDay({ u_id, date });
        return res.status(200).json(macronutrientRatioResponseDTO);
    }

    evaluateMacronutrientIntakeForDay = async (req : Request, res : Response, next : NextFunction) => {
        const u_id : number = parseInt(req.params.u_id);
        const date : string = req.body.date;
        const macronutrientRatioForDayResponseDTO : MacronutrientRatioForDayResponseDTO = await this.nutrientsRetioServie.evaluateMacronutrientIntakeForDay({ u_id, date });
        return res.status(200).json(macronutrientRatioForDayResponseDTO);
    }

    evaluateMacronutrientIntakeForWeek = async (req : Request, res : Response, next : NextFunction) => {
        const u_id : number = parseInt(req.params.u_id);
        const date : string = req.body.date;
        const re = await this.nutrientsRetioServie.calculateMacronutrientRatioForWeek({ u_id, date });
        return res.status(200).json(re);
    }
}
type EachKcal={
    morning : number;
    lunch : number;
    dinner : number;
}

type MacronutrientRatio = {
    carbohydrate : number;
    protein : number;
    fat : number;
}

type DailyMacronutrientSummary = {
    macronutrientRecommendation :{
        carbohydrate : number,
        protein : number,
        fat : number
    },
    intakeMacronutrient : { 
        carbohydrate : number,
        protein : number,
        fat : number
    },
    result : {
        carbohydrate : string,
        protein : string,
        fat : string
    },
}

type DailyKcal = {
    date : string;
    intakeKcal : number;
}

type WeekMacronutrientSummary = {
    macronutrientRatio : MacronutrientRatio;
    kcal : DailyKcal[];
}

export {EachKcal, MacronutrientRatio, DailyMacronutrientSummary, WeekMacronutrientSummary, DailyKcal} ;
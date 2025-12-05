export type MessageProps = {
  input: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSend: () => void;
  isLoading: boolean;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type Message = {
  id: string;              
  role: "user" | "assistant";
  content: string;          
  timestamp: number;       
}

export type Gender = 'male' | 'female';

export interface ResponseResult {
  text: string;
  gender?: Gender;
}

export interface WorkOut {
  id: number,
  name: string,
  category: "strength" | "cardio" | "flexibility" | "mobility" | "hiit",
  targetGender: "male" | "female" | "both",
  difficultyLevel: "beginner" | "intermediate" | "advanced",
  targetMuscles: ("chest" | "back" | "shoulders" | "biceps" | "triceps" | "forearms" | "abs" | "obliques" | "lower_back" | "quads" | "hamstrings" | "glutes" | "calves" | "core" | "full_body")[],
  equipmentNeeded: ("none" | "dumbbells" | "barbell" | "bench" | "pull_up_bar" | "resistance_bands" | "kettlebell" | "cable_machine" | "squat_rack" | "treadmill" | "jump_rope" | "yoga_mat" | "medicine_ball")[],
  description: string,
  properForm: string, 
  commonMistakes: string[],
  setsRecommended: number, 
  repsRecommended: string, 
  restTimeSeconds: number, 
  naijaContext: string, 
  alternatives: number[],
  caloriesBurnedPerSet?: number, 
  videoUrl?: string, 
  imageUrl?: string
}

export interface Food {
  id: number,
  name: string,
  localNames: {
    yoruba?: string,
    igbo?: string,
    hausa?: string,
    pidgin?: string
  },
  category: "protein" | "carbs" | "vegetables" | "fruits" | "snacks" | "beverages" | "swallow",
  caloriesPer100g: number,
  proteinG: number,
  carbsG: number,
  fatsG: number,
  fiberG: number,
  isBudgetFriendly: boolean,
  availability: "common" | "seasonal" | "regional",
  preparationTips: string,
  healthierAlternatives: number[],
  budgetAlternatives: number[],
  naijaContext?: string,
  servingSizeCommon?: string, 
  vitaminC?: number,
  iron?: number,
  calcium?: number
}

export interface MealPlan {
  id: number,
  name: string,
  goal: "weight_loss" | "muscle_gain" | "maintenance" | "endurance" | "strength",
  targetGender: "male" | "female" | "both",
  dailyCalories: number,
  dailyProteinG: number,
  dailyCarbsG: number,
  dailyFatsG: number,
  meals: [
    {
      mealType: "breakfast" | "lunch" | "dinner" | "snack",
      time?: string, 
      foods: [
        {
          foodId: number,
          foodName: string,
          portion: string, 
          calories: number,
          proteinG: number,
          carbsG: number,
          fatsG: number
        }
      ],
      totalCalories: number,
      totalProteinG: number,
      totalCarbsG: number,
      totalFatsG: number,
      preparationTime?: string, 
      cost?: string
    }
  ],
  naijaContext: string,
  budgetPerDay?: string,
  shoppingList?: string[]
}

export interface FormGuide {
  id: number,
  exerciseId: number, 
  exerciseName: string,
  stanceDescription: string, 
  movementPattern: string,
  breathingTechnique: string, 
  safetyTips: string[], 
  commonInjuriesToAvoid: string[], 
  naijaContext: string 
  gripDescription?: string, 
  videoUrl?: string,
  imageUrl?: string,
  progressionTips?: string, 
  regressionTips?: string 
}








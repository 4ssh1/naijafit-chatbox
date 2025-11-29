import { Gender, ResponseResult, WorkOut, Food, MealPlan, FormGuide } from "./types";
import { defaultResponses } from "./consts";
import workouts from "../data/workout.json";
import foods from "../data/foods.json";

// import mealPlans from "../data/meal-plans.json";
// import formGuides from "../data/form-guides.json";


export function getContextualResponse(
  msg: string,
  gender?: Gender,
  workouts?: WorkOut[],
  foods?: Food[],
  mealPlans?: MealPlan[],
  formGuides?: FormGuide[]
): ResponseResult {

  const text = msg.toLowerCase();
  if (!gender && (text.includes("male") || text.includes("man") || text.includes("guy"))) {
    return {
      text: "Tell me — what's your fitness goal? Weight loss, muscle gain, or general fitness?",
      gender: "male",
    };
  }

  if (!gender && (text.includes("female") || text.includes("woman") || text.includes("lady"))) {
    return {
      text: "Nice! As a female, we can tailor workouts to your goals. What's your primary goal? Weight loss, toning, or strength?",
      gender: "female",
    };
  }

  if (formGuides && (
    text.includes("form") ||
    text.includes("how to do") ||
    text.includes("proper") ||
    text.includes("stance") ||
    text.includes("position") ||
    text.includes("technique")
  )) {

    const found = formGuides.find(f => text.includes(f.exerciseName.toLowerCase()));

    if (found) {
      return {
        text:
          `**${found.exerciseName} — Proper Form Guide**\n\n` +
          `**Stance:** ${found.stanceDescription}\n\n` +
          `**Movement Pattern:** ${found.movementPattern}\n\n` +
          `**Breathing:** ${found.breathingTechnique}\n\n` +
          `**Safety Tips:**\n- ${found.safetyTips.join("\n- ")}\n\n` +
          `**Common Injuries to Avoid:**\n- ${found.commonInjuriesToAvoid.join("\n- ")}\n\n` +
          (found.naijaContext ? `**Tips:** ${found.naijaContext}\n\n` : "") +
          (found.videoUrl ? `**Video:** ${found.videoUrl}` : "")
      };
    }

    return { text: "Tell me the name of the exercise so I can guide your form properly." };
  }

  if (workouts && (
    text.includes("workout") ||
    text.includes("exercise") ||
    text.includes("routine") ||
    text.includes("plan")
  )) {

    const difficulty =
      text.includes("beginner") ? "beginner" :
      text.includes("intermediate") ? "intermediate" :
      text.includes("advanced") ? "advanced" :
      null;

    const muscles: WorkOut["targetMuscles"][] = [
      "chest","back","shoulders","biceps","triceps","forearms",
      "abs","obliques","lower_back","quads","hamstrings","glutes",
      "calves","core","full_body"
    ];

    const targetMuscle = muscles.find(m => text.includes(m.replace("_"," ")));

    let matched = workouts.filter(w => w.targetGender === gender || w.targetGender === "both");

    if (difficulty) {
      matched = matched.filter(w => w.difficultyLevel === difficulty);
    }

    if (targetMuscle) {
      matched = matched.filter(w => w.targetMuscles === targetMuscle);
    }

    if (matched.length > 0) {
      const first = matched[0];
      return {
        text:
          `Here's a workout you can try:\n\n**${first.name}**\n` +
          `**Muscles:** ${first.targetMuscles}\n` +
          `**Difficulty:** ${first.difficultyLevel}\n` +
          `**Equipment:** ${first.equipmentNeeded}\n\n` +
          `**Description:** ${first.description}\n\n` +
          `**Proper Form:** ${first.properForm}\n` +
          `**Common Mistakes:**\n- ${first.commonMistakes.join("\n- ")}\n\n` +
          (first.naijaContext ? `**Tips:** ${first.naijaContext}\n\n` : "") +
          (first.videoUrl ? `**Video:** ${first.videoUrl}` : "")
      };
    }

    return {
      text: "I can create a workout for you — do you want fat loss, strength, or full-body training?"
    };
  }

  if (foods && (
    text.includes("alternative") ||
    text.includes("replace") ||
    text.includes("instead of")
  )) {

    const foundFood = foods.find(f => text.includes(f.name.toLowerCase()));

    if (foundFood) {
      const healthier = foundFood.healthierAlternatives
        .map(id => foods.find(f => f.id === id)?.name)
        .filter(Boolean);

      return {
        text:
          `Here are healthier alternatives to **${foundFood.name}**:\n\n- ` +
          healthier.join("\n- ") +
          (foundFood.naijaContext ? `\n\n**Naija Tip:** ${foundFood.naijaContext}` : "")
      };
    }

    return { text: "Which food would you like to replace? Eg: bread, rice, semo, etc." };
  }

  if (mealPlans && (
    text.includes("meal") ||
    text.includes("diet") ||
    text.includes("food plan")
  )) {

    const isWeightLoss = text.includes("weight loss") || text.includes("lose weight");
    const isMuscleGain = text.includes("muscle") || text.includes("bulk");

    let result: MealPlan | undefined;

    if (gender) {
      if (isWeightLoss) result = mealPlans.find(p => p.goal === "weight_loss" && (p.targetGender === gender || p.targetGender === "both"));
      if (isMuscleGain) result = mealPlans.find(p => p.goal === "muscle_gain" && (p.targetGender === gender || p.targetGender === "both"));
    }

    if (result) {
      const mealsText = result.meals.map(m =>
        `**${m.mealType}:** ${m.foods.map(f => `${f.foodName} (${f.portion})`).join(", ")} — ${m.totalCalories} kcal`
      ).join("\n\n");

      return {
        text:
          `**${result.name} Meal Plan**\n\n` +
          mealsText +
          `\n\n**Daily Calories:** ${result.dailyCalories}\n\n` +
          (result.naijaContext ? `**Naija Tip:** ${result.naijaContext}` : "")
      };
    }

    return { text: "Do you want a meal plan for weight loss, muscle gain, or maintenance?" };
  }

  return { text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)] };
}

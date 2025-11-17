import { Gender, ResponseResult } from "./types";
import { defaultResponses } from "./consts";

export const getContextualResponse = (msg: string, gender?: Gender): ResponseResult => {
  const lower = msg.toLowerCase();

  if (!gender && (lower.includes('male') || lower.includes('female') || lower.includes('man') || lower.includes('woman'))) {
    if (lower.includes('female') || lower.includes('woman') || lower.includes('lady')) {
      return {
        text: "Welcome! Let's get started with your fitness journey. Are you a beginner, intermediate, or have you already been working out?",
        gender: 'female',
      };
    } else {
      return {
        text: "Hello! Ready to transform your body? Are you a beginner, intermediate, or experienced in gym workouts?",
        gender: 'male',
      };
    }
  }

  // Workout responses
  if (lower.includes('workout') || lower.includes('exercise') || lower.includes('routine')) {
    if (gender === 'female') {
      return {
        text: "Here’s a suggested workout plan:\n\n**Lower Body (3x/week):** Squats, Lunges, Glute Bridges, Leg Press\n**Upper Body (2x/week):** Push-ups, Dumbbell Rows, Shoulder Press\n**Cardio:** 20-30 minutes of dancing, skipping, or brisk walking\n\nConsistency is key. Which area would you like to focus on?",
      };
    } else {
      return {
        text: "Here’s a suggested workout plan:\n\n**Push Day:** Bench Press/Push-ups, Overhead Press, Dips/Tricep Extensions\n**Pull Day:** Pull-ups/Lat Pulldowns, Rows, Bicep Curls\n**Leg Day:** Squats, Romanian Deadlifts, Calf Raises\n\nTrain 4-5 days per week and rest adequately. Which day would you like to start?",
      };
    }
  }

  // Nutrition responses
  if (lower.includes('food') || lower.includes('eat') || lower.includes('meal') || lower.includes('diet')) {
    if (gender === 'female') {
      return {
        text: "**Sample Meal Plan:**\n\nBreakfast: Boiled yam + eggs, Oatmeal + banana, or Pap with Moi-Moi\nLunch: Brown rice or Ofada rice + grilled protein + vegetables\nDinner: Pepper soup or Vegetable soup + light portion of starch\nSnacks: Fruits, nuts, coconut\n\nReduce refined carbs and sugary drinks. Need alternatives?",
      };
    } else {
      return {
        text: "**Sample Meal Plan:**\n\nBreakfast: Yam porridge + eggs + fish, Oats + milk + banana, Beans + plantain + egg\nLunch: White rice/Jollof + chicken + veggies, Eba + Egusi soup, Tuwo + assorted soup\nDinner: Brown rice + grilled protein, Yam + fish pepper soup, Beans + plantain + beef\nSnacks: Nuts, eggs, fruits, smoothies\n\nFocus on protein (1.6–2.2g per kg body weight). Are you trying to bulk or cut?",
      };
    }
  }

  // Weight/form guidance
  if (lower.includes('weight') || lower.includes('stance') || lower.includes('form') || lower.includes('position')) {
    return {
      text: "Good form is essential. \n\n**Key Points:**\n- Squats: Feet shoulder-width, knees track over toes, chest up, back straight.\n- Deadlifts: Bar close to shins, back flat, drive through heels.\n- Bench Press: Shoulder blades squeezed, slight arch in lower back, bar touches mid-chest.\n- Overhead Press: Core tight, press straight up.\n\n**Weight selection:** 8–12 reps with the last 2 challenging. Start light and progress gradually.\nWhich specific exercise would you like guidance on?",
    };
  }

  // Alternative foods
  if (lower.includes('alternative') || lower.includes('replace') || lower.includes('instead')) {
    return {
      text: "Here are some alternatives:\n\n**Carbs:** White rice → Brown rice, unripe plantain, sweet potato\n**Protein:** Beef → Chicken, Turkey, Fish, Eggs, Beans\n**Veggies:** Lettuce → Spinach, Kale, Ugu\n**Snacks:** Chips → Nuts, Coconut, Fruits\n\nWhich item would you like to replace specifically?",
    };
  }


  return { text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)] };
};

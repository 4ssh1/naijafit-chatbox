import foodsData from '../data/foods.json';
import workoutsData from '../data/workout.json';
import mealPlansData from '../data/meal-plan.json';

export function getWorkouts(filters?: {
  gender?: string;
  difficulty?: string;
  equipment?: string;
  muscleGroup?: string;
}) {
  let workouts = workoutsData.workouts;

  if (filters) {
    if (filters.gender && filters.gender !== 'both') {
      workouts = workouts.filter(w => 
        w.targetGender === filters.gender || w.targetGender === 'both'
      );
    }

    if (filters.difficulty) {
      workouts = workouts.filter(w => w.difficultyLevel === filters.difficulty);
    }

    if (filters.equipment) {
      workouts = workouts.filter(w => 
        w.equipmentNeeded.includes(filters.equipment as string)
      );
    }

    if (filters.muscleGroup) {
      workouts = workouts.filter(w => 
        w.targetMuscles.includes(filters.muscleGroup as string)
      );
    }
  }

  return workouts;
}

export function getWorkoutById(id: number) {
  return workoutsData.workouts.find(w => w.id === id);
}

export function getFoods(filters?: {
  category?: string;
  budgetFriendly?: boolean;
  search?: string;
}) {
  let foods = foodsData.foods;

  if (filters) {
    if (filters.category) {
      foods = foods.filter(f => f.category === filters.category);
    }

    if (filters.budgetFriendly) {
      foods = foods.filter(f => f.isBudgetFriendly);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      foods = foods.filter(f => 
        f.name.toLowerCase().includes(searchLower) ||
        Object.values(f.localNames).some(name => 
          name.toLowerCase().includes(searchLower)
        )
      );
    }
  }

  return foods;
}
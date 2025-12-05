// 'use server';

// import { DifficultyLevel, FoodCategory, TargetGender } from '@prisma/client';
// import prisma from './prisma';

// export async function getWorkouts(filters?: {
//   gender?: string;
//   difficulty?: string;
//   equipment?: string;
//   muscleGroup?: string;
// }) {
//   try {
//     const where: any = {};

//     if (filters) {
//       if (filters.gender && filters.gender !== 'both') {
//         where.OR = [
//           { targetGender: filters.gender as TargetGender },
//           { targetGender: 'both' as TargetGender }
//         ];
//       }

//       if (filters.difficulty) {
//         where.difficultyLevel = filters.difficulty as DifficultyLevel;
//       }

//       if (filters.equipment) {
//         where.equipmentNeeded = {
//           hasSome: [filters.equipment]
//         };
//       }

//       if (filters.muscleGroup) {
//         where.targetMuscles = {
//           hasSome: [filters.muscleGroup]
//         };
//       }
//     }

//     return await prisma.workout.findMany({
//       where: Object.keys(where).length > 0 ? where : undefined,
//       include: {
//         alternativesFrom: {
//           include: {
//             alternativeExercise: true
//           }
//         }
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching workouts:', error);
//     throw error;
//   }
// }

// export async function getWorkoutById(id: number) {
//   try {
//     return await prisma.workout.findUnique({
//       where: { id },
//       include: {
//         alternativesFrom: {
//           include: {
//             alternativeExercise: true
//           }
//         },
//         alternativesTo: {
//           include: {
//             originalExercise: true
//           }
//         }
//       }
//     });
//   } catch (error) {
//     console.error(`Error fetching workout ${id}:`, error);
//     throw error;
//   }
// }

// export async function getFoods(filters?: {
//   category?: string;
//   budgetFriendly?: boolean;
//   search?: string;
// }) {
//   try {
//     const where: any = {};

//     if (filters) {
//       if (filters.category) {
//         where.category = filters.category as FoodCategory;
//       }

//       if (filters.budgetFriendly !== undefined) {
//         where.isBudgetFriendly = filters.budgetFriendly;
//       }

//       if (filters.search) {
//         where.OR = [
//           {
//             name: {
//               contains: filters.search,
//               mode: 'insensitive'
//             }
//           },
//           {
//             localName: {
//               contains: filters.search,
//               mode: 'insensitive'
//             }
//           }
//         ];
//       }
//     }

//     return await prisma.nigerianFood.findMany({
//       where: Object.keys(where).length > 0 ? where : undefined,
//       include: {
//         alternativesFrom: {
//           include: {
//             alternativeFood: true
//           }
//         }
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching foods:', error);
//     throw error;
//   }
// }

// export async function getMealPlansByGoal(goal: string, targetGender?: string) {
//   try {
//     return await prisma.mealPlan.findMany({
//       where: {
//         goal: goal as any,
//         ...(targetGender && {
//           OR: [
//             { targetGender: targetGender as TargetGender },
//             { targetGender: 'both' as TargetGender }
//           ]
//         })
//       },
//       include: {
//         meals: {
//           include: {
//             mealPlanItems: {
//               include: {
//                 food: true
//               }
//             }
//           }
//         }
//       }
//     });
//   } catch (error) {
//     console.error(`Error fetching meal plans for goal ${goal}:`, error);
//     throw error;
//   }
// }

// export async function getMealPlanById(id: number) {
//   try {
//     return await prisma.mealPlan.findUnique({
//       where: { id },
//       include: {
//         meals: {
//           include: {
//             mealPlanItems: {
//               include: {
//                 food: true
//               }
//             }
//           }
//         }
//       }
//     });
//   } catch (error) {
//     console.error(`Error fetching meal plan ${id}:`, error);
//     throw error;
//   }
// }
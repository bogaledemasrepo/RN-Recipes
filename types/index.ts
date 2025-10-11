
// // --- TypeScript Interfaces for Type Safety ---

// export interface Ingredient {
//   id: number;
//   ingredient: string;
//   measure: string;
// }

// export interface Recipe {
//   idMeal: string;
//   strMeal: string;
//   strCategory: string;
//   strArea: string;
//   strInstructions: string;
//   strMealThumb: string | null;
//   // Dynamic keys for ingredients and measures will be handled internally
//   [key: string]: any; 
// }

// export interface Favorite {
//     idMeal: string;
//     strMeal: string;
//     strCategory: string;
//     strMealThumb: string | null;
//     firestoreId: string;
//     timestamp: string; // Add timestamp to favorite data
// }

// export type Screen = 'Search' | 'Favorites' | 'Detail';

//   // --- Sub-Components ---

// export  interface CardProps {
//     item: Recipe | Favorite;
//   }

  
// export  interface DetailProps {
//       recipe: Recipe | Favorite;
//     }
//   // Simple Tab Button Component
//  export interface TabButtonProps {
//       icon: string;
//       label: string;
//       isActive: boolean;
//       onPress: () => void;
//       isDisabled?: boolean;
//   }


  export interface Ingredient {
  id: number;
  ingredient: string;
  measure: string;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string | null;
  [key: string]: any;
}

export interface Favorite {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string | null;
  firestoreId: string;
  timestamp: string;
}
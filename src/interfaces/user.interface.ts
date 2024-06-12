import { GradeInterface } from "./grade.interface";

import { PromotionInterface } from "./promotion.interface";

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  promotions: PromotionInterface[];
  course?: string;
  grades: GradeInterface[];
}

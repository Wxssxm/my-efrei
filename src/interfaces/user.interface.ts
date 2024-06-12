import { RoleEnum } from "../enums/role.enum";
import { GradeInterface } from "./grade.interface";

import { PromotionInterface } from "./promotion.interface";

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleEnum;
  promotions: PromotionInterface[];
  course?: string;
  grades: GradeInterface[];
}

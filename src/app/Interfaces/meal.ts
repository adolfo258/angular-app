import { IRestaurant } from "./restaurant";
import { IUser } from "./user";

export interface IMeal {
  _id?: string;
  name: string;
  taste: string;
  origin: string;
  veggie: string;
  avatar?: File;
  restaurants?: IRestaurant[];
  manager: IUser;
  createdAt?: string;
  updatedAt?: string;
}

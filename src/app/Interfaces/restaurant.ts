import { IMeal } from "./meal";
import { IUser } from "./user";

export interface IRestaurant {
  _id?: string;
  name: string;
  smoke: string;
  lat: string;
  long: string;
  cuit: string;
  managerId: IUser;
  avatar?: File;
  meals?: IMeal[];
  createdAt?: string;
  updatedAt?: string;
}

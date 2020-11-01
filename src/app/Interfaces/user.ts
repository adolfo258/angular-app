export interface IUser {
  _id?: string;
  name: string;
  lastName: string;
  dni: string;
  fec_nac: string;
  sex: string;
  password: string;
  email: string;
  rol: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v: number;
  avatar?: File;
}

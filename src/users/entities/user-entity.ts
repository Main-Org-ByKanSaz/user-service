export interface IUser {
  userId: string;
  username: string;
  password: string;
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  role: string[];
}

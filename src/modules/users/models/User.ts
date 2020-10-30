export enum UserLevels {
  User = 'user',
  Employee = 'employee',
  Admin = 'admin',
}

export const UserLevelsArray = [
  UserLevels.User,
  UserLevels.Employee,
  UserLevels.Admin,
];

type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmed: boolean;
  password?: string;
  level: UserLevels;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export default User;

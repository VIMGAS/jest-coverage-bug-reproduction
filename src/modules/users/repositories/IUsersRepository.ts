import User from '../models/User';

export default interface IUsersRepository {
  getById(id: string): Promise<User | null>;

  getByEmailAndConfirmed({
    email,
    confirmed,
  }: {
    email: string;
    confirmed: boolean;
  }): Promise<User | null>;
}

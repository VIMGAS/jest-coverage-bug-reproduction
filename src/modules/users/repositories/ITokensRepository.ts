import Token from '../models/Token';

export default interface ITokensRepository {
  getByToken(id: string): Promise<Token | null>;

  create(token: Token): Promise<Token>;
}

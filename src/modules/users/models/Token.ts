export enum TokenTypes {
  PasswordReset = 'passwordReset',
  Invitation = 'invitation',
}

export const TokenTypesArray = [
  TokenTypes.PasswordReset,
  TokenTypes.Invitation,
];

type Token = {
  _id?: string;
  token: string;
  type: TokenTypes;
  userId: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  expiresAt?: Date;
};

export default Token;

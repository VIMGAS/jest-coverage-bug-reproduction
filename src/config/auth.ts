export type AuthConfig = {
  secret: string;
  session: { expiresIn: string };
};

export default {
  secret: process.env.SECRET_KEY || 'secret',
  session: { expiresIn: '1d' },
} as AuthConfig;

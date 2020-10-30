export type AppConfig = {
  name: string;
  secret: string;
  port: number;
  env: string;
};

export default {
  name: process.env.APP_NAME || 'test',
  secret: process.env.SECRET_KEY || 'secret',
  port: Number(process.env.PORT) || 3333,
  env: process.env.NODE_ENV || 'development',
} as AppConfig;

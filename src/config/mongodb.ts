export type DatabaseConnectionOptions = {
  username: string;
  password?: string;
  host: string;
  port: string;
  database: string;
  authSource: string;
};

export default {
  host: process.env.MONGODB_HOST || 'localhost',
  port: process.env.MONGODB_PORT || 27017,
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
  database: process.env.MONGODB_DATABASE,
  authSource: process.env.MONGODB_AUTHSOURCE,
} as DatabaseConnectionOptions;

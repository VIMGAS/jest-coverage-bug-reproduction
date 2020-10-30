import mongodbConfig from '@config/mongodb';

export default function connectionUrl(): string {
  const userNameAndPasswordString: string = mongodbConfig.username
    ? `${mongodbConfig.username}:${mongodbConfig.password}@`
    : '';

  return `mongodb://${userNameAndPasswordString}${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.database}?authSource=${mongodbConfig.authSource}`;
}

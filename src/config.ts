import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      password: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
    },
  };
});

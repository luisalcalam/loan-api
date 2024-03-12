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
    jwt: {
      secretJwt: process.env.JWT_SECRET,
      jwtExpirationDate: process.env.JWT_EXPIRATION_TIME,
      refreshSecretJwt: process.env.SECRET_REFRESH_JWT,
      refreshJwtExpirationDate: process.env.REFRESH_JWT_EXPIRATION_TIME,
    },
  };
});

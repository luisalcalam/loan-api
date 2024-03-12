import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

import config from '../config';
import { join } from 'path';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          host: configService.postgres.host,
          port: +configService.postgres.port,
          database: configService.postgres.dbName,
          username: configService.postgres.username,
          password: configService.postgres.password,
          synchronize: false,
          autoLoadEntities: true,
          migrationsRun: true,
          migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
          migrationsTableName: 'migrations_typeorm',
          cli: {
            migrationsDir: 'src/migration',
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

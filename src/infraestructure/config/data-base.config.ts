import { ConfigService } from '@nestjs/config';
import { EnvVariables } from '../env/env-variables.enum';

export const dataBaseConfigFactory = (configService: ConfigService) => {
  const config = {
    // extra: {'ssl': 'false'},
    type: configService.get(EnvVariables.DATABASE_TYPE),
    host: configService.get(EnvVariables.DATABASE_HOST),
    port: parseInt(configService.get(EnvVariables.DATABASE_PORT), 10),
    username: configService.get(EnvVariables.DATABASE_USER),
    password: configService.get(EnvVariables.DATABASE_PASSWORD),
    database: configService.get(EnvVariables.DATABASE_NAME),

    entities: [__dirname + configService.get(EnvVariables.TYPEORM_ENTITIES_DIR)], 
    synchronize: true,
    logging: true,

    migrationsTableName: configService.get(
      EnvVariables.TYPEORM_MIGRATIONS_TABLENAME,
    ),
    ssl: false,
    migrations: [__dirname + configService.get(EnvVariables.TYPEORM_MIGRATIONS_DIR)], 
    cli: {migrationsDir: configService.get(EnvVariables.TYPEORMCLI_MIGRATIONS_DIR)}
  }
  console.log(config)
  return config
};

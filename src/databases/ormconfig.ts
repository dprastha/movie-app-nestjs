import databaseConfig from 'src/config/database.config';

module.exports = {
  type: 'mysql',
  host: databaseConfig().host,
  port: databaseConfig().port,
  username: databaseConfig().username,
  password: databaseConfig().password,
  database: databaseConfig().database,
  entities: databaseConfig().entities,
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  logging: ['warn', 'error'],
  migrations: ['dist/databases/migrations/*.js'],
  cli: {
    migrationsDir: 'src/databases/migrations',
  },
};

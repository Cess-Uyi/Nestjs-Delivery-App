export = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.model{.ts,.js}'],
  migrations: ['dist/src/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/migrations',
  },
};

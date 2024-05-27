export const appConfig: any = {
  main: {
    state: 'production',
    port: 3000,
  },
  auth: {
    jwtExpTime: '15m',
  },
  db: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
  },
};

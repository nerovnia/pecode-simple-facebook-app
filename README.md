# Simple facebook like application

[API documentation](./doc/api/index.md)

**Please use:**

- Node.js: `>=20`
- database: `PostgreSQL`

## Set start parameters

- Create .env

`Necessary`

```text
DATABASE_DBNAME=dbname
DATABASE_USER=myuser
DATABASE_PASSWORD=mypassword
JWT_SECRET=secret
```

`Can use as default`

```text
APP_PORT=port (default 3000)
DATABASE_HOST=host (default 'localhost')
DATABASE_PORT=port (default 5432)
JWT_EXP_TIME=time (default 15m')
```

`Change default settings`

*src/config/app.default.config.ts*

```ts
{
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
```

## Installation

```bash
$ pnpm install
```
## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# build application
$ pnpm run build

# production mode
$ pnpm run start:prod
```

## Database migrations

```
$ pnpm run typeorm:create-migration          # Create a migration
$ pnpm run typeorm:generate-migration        # Generate a migration
$ pnpm run typeorm:run-migrations            # Run a migration
$ pnpm run typeorm:revert-migration          # Revert a migration
```


# Simple facebook like application

**Please use:**

- Node.js: `>=20`
- database: `PostgreSQL`

Create .env

```text
DATABASE_DBNAME=dbname
DATABASE_USER=myuser
DATABASE_PASSWORD=mypassword
JWT_SECRET=secret
APP_STATE=production || development (default 'production')
APP_PORT=port (default 3000)
DATABASE_HOST=host (default 'localhost')
DATABASE_PORT=port (default 5432)
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

# production mode
$ pnpm run start:prod
```

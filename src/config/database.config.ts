import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../modules/users/user.entity';
import { Post } from '../modules/posts/post.entity';
import 'dotenv/config';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number.parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME,
  entities: [User, Post],
  migrationsRun: global.isProduction,  // Auto-run migrations
  synchronize: !global.isProduction,
  logging: !global.isProduction,
};


const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number.parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME,
  entities: [
    'src/modules/users/user.entity.ts',
    'src/modules/posts/post.entity.ts',
  ],
  migrations: ['./db/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: false,
});

export default dataSource;

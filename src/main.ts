import './global';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config/app.default.config';
import 'dotenv/config';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function getApp() {
  if (appConfig.main.engine === 'express') {
    const app = await NestFactory.create(AppModule);
    return app;
  }
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter() // Setting the Fastify adapter
  );
  return app;
}


async function bootstrap() {
  const app = await getApp();
  const appPort = process.env.APP_PORT || appConfig.main.port;
  //(app) ?? await app.listen(appPort, '0.0.0.0');
  if (app) {
    await app.listen(appPort, '0.0.0.0');
    console.log(`Server started on port ${appPort}...`);
    console.log(app);
  } else {
    throw new Error('Server can\'t be started!')
  }
}
bootstrap();

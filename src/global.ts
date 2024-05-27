import { appConfig } from './config/app.default.config';
import 'dotenv/config';

global.isProduction =
  (process.env.APP_STATE || appConfig.main.state) === 'production';
global.JWT_EXP_TIME = process.env.JWT_EXP_TIME || appConfig.auth.jwtExpTime;

import * as dotenv from 'dotenv';
dotenv.config();

global.isProduction = (process.env.APP_STATE || 'production') === 'production';

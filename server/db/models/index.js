// Заменить весь файл на:
import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../database.js')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    models: [__dirname + '/*.model.*'],
  },
);

export default sequelize;

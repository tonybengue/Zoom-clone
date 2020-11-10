import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

// dotenv
config();
const db_hostname = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASS;
const db_name = process.env.DB_NAME;

// Load default config
const defaultConfig = JSON.parse(
  readFileSync(resolve(__dirname, '../config.json')).toString()
);

// Structure
export interface IConfig {
  PORT: number;
  express_debug: boolean;
  mongo_debug: boolean;

  mongo_host: string;
  mongo_user: string;
  mongo_pass: string;
  mongo_database: string;
}

// Process configuration
export function configuration(): IConfig {
  const result: any = { ...defaultConfig, db_hostname, db_user, db_password, db_name };

  for (const key in result) {
    if (key in process.env) result[key] = process.env[key];
  }

  return result;
}
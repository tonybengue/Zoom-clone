import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// if (process.env.NODE_ENV !== 'production') {
//   config();
// }

// dotenv
config();
const mongo_host = process.env.DB_HOST;
const mongo_user = process.env.DB_USER;
const mongo_pass = process.env.DB_PASS;
const mongo_database = process.env.DB_NAME;

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
  const result: any = { ...defaultConfig, mongo_host, mongo_user, mongo_pass, mongo_database };

  for (const key in result) {
    if (key in process.env) result[key] = process.env[key];
  }

  return result;
}
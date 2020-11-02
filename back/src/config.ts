import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

config();

// Load default config
const defaultConfig = JSON.parse(
  readFileSync(resolve(__dirname, '../config.json')).toString()
);

export interface IConfig {
  PORT: number;
  express_debug: boolean;
}

export function configuration(): IConfig {
  const result: any = { ...defaultConfig };

  for (const key in result) {
    if (key in process.env) result[key] = process.env[key];
  }

  return result;
}
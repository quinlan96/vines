/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 * This is useful for environment variables, command line arguments, and cron-jobs.
 */

import path from 'path';
import dotenv from 'dotenv';

process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config');

(() => {
  dotenv.config({
    path: path.join(__dirname, '../../.env'),
  });
})();

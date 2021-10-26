import { deferConfig } from 'config/defer';
import path from 'path';

interface AppConfig {
    host: string;
    port: number;
    relativeStoragePath: string;
    db: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    }
}

export default {
    host: 'http://localhost',
    port: 3001,
    apiBase: deferConfig(function apiBase(this: AppConfig) {
        return `${this.host}:${this.port}`;
    }),
    relativeStoragePath: '/storage',
    storagePath: deferConfig(function storagePath(this: AppConfig) {
        return path.join(__dirname, '../..', this.relativeStoragePath);
    }),
    db: {
        host: 'localhost',
        port: 27017,
        username: 'root',
        password: '',
        database: 'vines',
    },
    databaseUri: deferConfig(function databaseUri(this: { default: AppConfig }) {
        return `mongodb://${this.default.db.username}:${this.default.db.password}@${this.default.db.host}:${this.default.db.port}`;
    }),
};

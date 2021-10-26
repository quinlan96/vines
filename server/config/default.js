const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
    host: 'http://localhost',
    port: 3001,
    apiBase: defer(function () {
        return `${this.host}:${this.port}`;
    }),
    relativeStoragePath: '/storage',
    storagePath: defer(function () {
        return path.join(__dirname, '../..', this.relativeStoragePath);
    }),
    db: {
        host: 'localhost',
        port: 27017,
        username: 'root',
        password: '',
        database: 'vines',
    },
    databaseUri: defer(function () {
        return `mongodb://${this.db.username}:${this.db.password}@${this.db.host}:${this.db.port}/${this.db.database}?authSource=admin`;
    }),
};

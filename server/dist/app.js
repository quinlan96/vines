"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const api_1 = __importDefault(require("./routes/api"));
const app = express_1.default();
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(cors_1.default());
app.use('/', index_1.default);
app.use('/api', api_1.default);
app.use('/static', express_1.default.static(path_1.default.join(process.env.DATA_DIR)));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404, 'Page not found'));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message
    // res.locals.error = req.app.get('env') === 'development' ? err : {}
    // return the error
    res.status(err.status || 500);
    res.json({
        status: err.status,
        message: err.message,
        stack: err.stack
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map
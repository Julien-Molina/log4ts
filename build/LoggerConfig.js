"use strict";
var LogLevel_1 = require("./LogLevel");
var BasicLayout_1 = require("./layouts/BasicLayout");
var HTMLLayout_1 = require("./layouts/HTMLLayout");
var ConsoleAppender_1 = require("./appenders/ConsoleAppender");
var DOMAppender_1 = require("./appenders/DOMAppender");
var LoggerConfig = (function () {
    function LoggerConfig(appender, level) {
        if (level === void 0) { level = LogLevel_1.LogLevel.INFO; }
        this.level = level;
        this.appenders = [];
        if (appender) {
            this.addAppender(appender);
        }
    }
    LoggerConfig.prototype.addAppender = function (appender) {
        this.appenders.push(appender);
    };
    LoggerConfig.prototype.setLevel = function (level) {
        this.level = level;
    };
    LoggerConfig.prototype.getAppenders = function () {
        return this.appenders;
    };
    LoggerConfig.prototype.getLevel = function () {
        return this.level;
    };
    LoggerConfig.createFromJson = function (json) {
        var config = new LoggerConfig(null, LogLevel_1.LogLevel[json.level]);
        for (var _i = 0, _a = json.layouts; _i < _a.length; _i++) {
            var layout_json = _a[_i];
            var layout = void 0;
            switch (layout_json.type) {
                case "basic":
                    layout = new BasicLayout_1["default"]();
                    break;
                case "html":
                    layout = new HTMLLayout_1["default"]();
                    break;
            }
            for (var _b = 0, _c = layout_json.appenders; _b < _c.length; _b++) {
                var appender_json = _c[_b];
                var appender = void 0;
                switch (appender_json.type) {
                    case "console":
                        appender = new ConsoleAppender_1["default"]();
                        break;
                    case "dom":
                        var options = appender_json.options;
                        appender = new DOMAppender_1["default"](options.container_id, options.escape_html);
                        break;
                }
                appender.setLayout(layout);
                config.addAppender(appender);
            }
        }
        return config;
    };
    return LoggerConfig;
}());
exports.__esModule = true;
exports["default"] = LoggerConfig;

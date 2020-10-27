"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var task_utils_1 = require("./task-utils");
module.exports = {
    onlyTests: function (_a) {
        var filename = _a.filename, title = _a.title;
        task_utils_1.onlyTests(filename, [title]);
        return null;
    },
    skipTests: function (_a) {
        var filename = _a.filename, title = _a.title;
        task_utils_1.skipTests(filename, [title]);
        return null;
    },
    allTests: function (_a) {
        var filename = _a.filename;
        task_utils_1.runAllTests(filename);
        return null;
    }
};

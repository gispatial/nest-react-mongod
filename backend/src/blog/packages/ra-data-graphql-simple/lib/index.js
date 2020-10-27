"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQuery = void 0;
var merge_1 = __importDefault(require("lodash/merge"));
var ra_data_graphql_1 = __importDefault(require("ra-data-graphql"));
var ra_core_1 = require("ra-core");
var buildQuery_1 = __importDefault(require("./buildQuery"));
var defaultOptions = {
    buildQuery: buildQuery_1.default,
};
exports.buildQuery = buildQuery_1.default;
exports.default = (function (options) {
    return ra_data_graphql_1.default(merge_1.default({}, defaultOptions, options)).then(function (defaultDataProvider) {
        return function (fetchType, resource, params) {
            // This provider does not support multiple deletions so instead we send multiple DELETE requests
            // This can be optimized using the apollo-link-batch-http link
            if (fetchType === ra_core_1.DELETE_MANY) {
                var ids = params.ids, otherParams_1 = __rest(params, ["ids"]);
                return Promise.all(ids.map(function (id) {
                    return defaultDataProvider(ra_core_1.DELETE, resource, __assign({ id: id }, otherParams_1));
                })).then(function (results) {
                    var data = results.reduce(function (acc, _a) {
                        var data = _a.data;
                        return __spreadArrays(acc, [data.id]);
                    }, []);
                    return { data: data };
                });
            }
            // This provider does not support multiple deletions so instead we send multiple UPDATE requests
            // This can be optimized using the apollo-link-batch-http link
            if (fetchType === ra_core_1.UPDATE_MANY) {
                var ids = params.ids, data_1 = params.data, otherParams_2 = __rest(params, ["ids", "data"]);
                return Promise.all(ids.map(function (id) {
                    return defaultDataProvider(ra_core_1.UPDATE, resource, __assign({ data: __assign({ id: id }, data_1) }, otherParams_2));
                })).then(function (results) {
                    var data = results.reduce(function (acc, _a) {
                        var data = _a.data;
                        return __spreadArrays(acc, [data.id]);
                    }, []);
                    return { data: data };
                });
            }
            return defaultDataProvider(fetchType, resource, params);
        };
    });
});

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
/* eslint-disable eqeqeq */
import fakeRestProvider from 'ra-data-fakerest';
import pullAt from 'lodash/pullAt';
/**
 * Respond to react-admin data queries using a local database persisted in localStorage
 *
 * Useful for local-first web apps.
 *
 * @example // initialize with no data
 *
 * import localStorageDataProvider from 'ra-data-local-storage';
 * const dataProvider = localStorageDataProvider();
 *
 * @example // initialize with default data (will be ignored if data has been modified by user)
 *
 * import localStorageDataProvider from 'ra-data-local-storage';
 * const dataProvider = localStorageDataProvider({
 *   defaultData: {
 *     posts: [
 *       { id: 0, title: 'Hello, world!' },
 *       { id: 1, title: 'FooBar' },
 *     ],
 *     comments: [
 *       { id: 0, post_id: 0, author: 'John Doe', body: 'Sensational!' },
 *       { id: 1, post_id: 0, author: 'Jane Doe', body: 'I agree' },
 *     ],
 *   }
 * });
 */
export default (function (_a) {
    var _b = _a.defaultData, defaultData = _b === void 0 ? {} : _b, _c = _a.localStorageKey, localStorageKey = _c === void 0 ? 'ra-data-local-storage' : _c, _d = _a.loggingEnabled, loggingEnabled = _d === void 0 ? false : _d, _e = _a.localStorageUpdateDelay, localStorageUpdateDelay = _e === void 0 ? 10 : _e;
    var localStorageData = localStorage.getItem(localStorageKey);
    var data = localStorageData ? JSON.parse(localStorageData) : defaultData;
    // change data by executing callback, then persist in localStorage
    var updateLocalStorage = function (callback) {
        // modify localStorage after the next tick
        setTimeout(function () {
            callback();
            localStorage.setItem(localStorageKey, JSON.stringify(data));
        }, localStorageUpdateDelay);
    };
    var baseDataProvider = fakeRestProvider(data, loggingEnabled);
    return {
        // read methods are just proxies to FakeRest
        getList: function (resource, params) {
            return baseDataProvider
                .getList(resource, params)
                .catch(function (error) {
                if (error.code === 1) {
                    // undefined collection error: hide the error and return an empty list instead
                    return { data: [], total: 0 };
                }
                else {
                    throw error;
                }
            });
        },
        getOne: function (resource, params) {
            return baseDataProvider.getOne(resource, params);
        },
        getMany: function (resource, params) {
            return baseDataProvider.getMany(resource, params);
        },
        getManyReference: function (resource, params) {
            return baseDataProvider
                .getManyReference(resource, params)
                .catch(function (error) {
                if (error.code === 1) {
                    // undefined collection error: hide the error and return an empty list instead
                    return { data: [], total: 0 };
                }
                else {
                    throw error;
                }
            });
        },
        // update methods need to persist changes in localStorage
        update: function (resource, params) {
            updateLocalStorage(function () {
                var index = data[resource].findIndex(function (record) { return record.id == params.id; });
                data[resource][index] = __assign(__assign({}, data[resource][index]), params.data);
            });
            return baseDataProvider.update(resource, params);
        },
        updateMany: function (resource, params) {
            updateLocalStorage(function () {
                params.ids.forEach(function (id) {
                    var index = data[resource].findIndex(function (record) { return record.id == id; });
                    data[resource][index] = __assign(__assign({}, data[resource][index]), params.data);
                });
            });
            return baseDataProvider.updateMany(resource, params);
        },
        create: function (resource, params) {
            // we need to call the fakerest provider first to get the generated id
            return baseDataProvider
                .create(resource, params)
                .then(function (response) {
                updateLocalStorage(function () {
                    if (!data.hasOwnProperty(resource)) {
                        data[resource] = [];
                    }
                    data[resource].push(response.data);
                });
                return response;
            });
        },
        delete: function (resource, params) {
            updateLocalStorage(function () {
                var index = data[resource].findIndex(function (record) { return record.id == params.id; });
                pullAt(data[resource], [index]);
            });
            return baseDataProvider.delete(resource, params);
        },
        deleteMany: function (resource, params) {
            updateLocalStorage(function () {
                var indexes = params.ids.map(function (id) {
                    return data[resource].findIndex(function (record) { return record.id == id; });
                });
                pullAt(data[resource], indexes);
            });
            return baseDataProvider.deleteMany(resource, params);
        },
    };
});

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
import { FETCH_END, REFRESH_VIEW } from '../../../../actions';
import { GET_LIST, CREATE, DELETE, DELETE_MANY, UPDATE, UPDATE_MANY, } from '../../../../core';
import ids from './cachedRequests/ids';
import total from './cachedRequests/total';
import validity from './cachedRequests/validity';
var initialState = {};
var initialSubstate = { ids: [], total: null, validity: null };
var cachedRequestsReducer = function (previousState, action) {
    var _a;
    if (previousState === void 0) { previousState = initialState; }
    if (action.type === REFRESH_VIEW) {
        // force refresh
        return initialState;
    }
    if (!action.meta || action.meta.fetchStatus !== FETCH_END) {
        // not a return from the dataProvider
        return previousState;
    }
    if (action.meta.fetchResponse === CREATE ||
        action.meta.fetchResponse === DELETE ||
        action.meta.fetchResponse === DELETE_MANY ||
        action.meta.fetchResponse === UPDATE ||
        action.meta.fetchResponse === UPDATE_MANY) {
        // force refresh of all lists because we don't know where the
        // new/deleted/updated record(s) will appear in the list
        return initialState;
    }
    if (action.meta.fetchResponse !== GET_LIST || action.meta.fromCache) {
        // looks like a GET_MANY, a GET_ONE, or a cached response
        return previousState;
    }
    var requestKey = JSON.stringify(action.requestPayload);
    var previousSubState = previousState[requestKey] || initialSubstate;
    return __assign(__assign({}, previousState), (_a = {}, _a[requestKey] = {
        ids: ids(previousSubState.ids, action),
        total: total(previousSubState.total, action),
        validity: validity(previousSubState.validity, action),
    }, _a));
};
export default cachedRequestsReducer;

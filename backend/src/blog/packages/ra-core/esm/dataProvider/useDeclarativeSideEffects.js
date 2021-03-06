import { useNotify, useRedirect, useRefresh, useUnselectAll, } from '../sideEffect';
import { useMemo } from 'react';
var useDeclarativeSideEffects = function () {
    var notify = useNotify();
    var redirect = useRedirect();
    var refresh = useRefresh();
    var unselectAll = useUnselectAll();
    return useMemo(function () { return function (resource, _a) {
        var _b = _a === void 0 ? {
            onSuccess: undefined,
            onFailure: undefined,
        } : _a, onSuccess = _b.onSuccess, onFailure = _b.onFailure;
        var convertToFunctionSideEffect = function (resource, sideEffects) {
            if (!sideEffects || typeof sideEffects === 'function') {
                return sideEffects;
            }
            if (Object.keys(sideEffects).length === 0) {
                return undefined;
            }
            var notification = sideEffects.notification, redirectTo = sideEffects.redirectTo, needRefresh = sideEffects.refresh, needUnselectAll = sideEffects.unselectAll;
            return function () {
                if (notification) {
                    notify(notification.body, notification.level, notification.messageArgs);
                }
                if (redirectTo) {
                    redirect(redirectTo);
                }
                if (needRefresh) {
                    refresh();
                }
                if (needUnselectAll) {
                    unselectAll(resource);
                }
            };
        };
        return {
            onSuccess: convertToFunctionSideEffect(resource, onSuccess),
            onFailure: convertToFunctionSideEffect(resource, onFailure),
        };
    }; }, [notify, redirect, refresh, unselectAll]);
};
export default useDeclarativeSideEffects;

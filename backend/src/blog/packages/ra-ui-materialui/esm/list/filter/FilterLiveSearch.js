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
import * as React from 'react';
import { memo } from 'react';
import { InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Form } from 'react-final-form';
import { useTranslate, useListFilterContext } from 'ra-core';
import TextInput from '../../input/TextInput';
/**
 * Form and search input for doing a full-text search filter.
 *
 * Triggers a search on change (with debounce).
 *
 * @example
 *
 * const FilterPanel = () => (
 *     <Card>
 *         <CardContent>
 *             <FilterLiveSearch source="title" />
 *         </CardContent>
 *     </Card>
 * );
 */
var FilterLiveSearch = function (props) {
    var _a = props.source, source = _a === void 0 ? 'q' : _a, rest = __rest(props, ["source"]);
    var _b = useListFilterContext(), filterValues = _b.filterValues, setFilters = _b.setFilters;
    var translate = useTranslate();
    var onSearchChange = function (event) {
        var _a;
        if (event.target) {
            setFilters(__assign(__assign({}, filterValues), (_a = {}, _a[source] = event.target.value, _a)), null);
        }
        else {
            var _b = filterValues, _c = source, _ = _b[_c], filters = __rest(_b, [typeof _c === "symbol" ? _c : _c + ""]);
            setFilters(filters, null);
        }
    };
    var onSubmit = function () { return undefined; };
    return (React.createElement(Form, { onSubmit: onSubmit }, function (_a) {
        var handleSubmit = _a.handleSubmit;
        return (React.createElement(TextInput, __assign({ resettable: true, helperText: false, source: source, label: translate('ra.action.search'), InputProps: {
                endAdornment: (React.createElement(InputAdornment, { position: "end" },
                    React.createElement(SearchIcon, { color: "disabled" }))),
            }, onChange: onSearchChange }, rest)));
    }));
};
export default memo(FilterLiveSearch);

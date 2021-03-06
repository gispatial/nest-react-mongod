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
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import sanitizeRestProps from './sanitizeRestProps';
import { fieldPropTypes } from './types';
var hasNumberFormat = !!(typeof Intl === 'object' &&
    Intl &&
    typeof Intl.NumberFormat === 'function');
/**
 * Display a numeric value as a locale string.
 *
 * Uses Intl.NumberFormat() if available, passing the locales and options props as arguments.
 * If Intl is not available, it outputs number as is (and ignores the locales and options props).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 * @example
 * <NumberField source="score" />
 * // renders the record { id: 1234, score: 567 } as
 * <span>567</span>
 *
 * <NumberField source="score" className="red" />
 * // renders the record { id: 1234, score: 567 } as
 * <span class="red">567</span>
 *
 * <NumberField source="share" options={{ style: 'percent' }} />
 * // renders the record { id: 1234, share: 0.2545 } as
 * <span>25%</span>
 *
 * <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 * // renders the record { id: 1234, price: 25.99 } as
 * <span>$25.99</span>
 *
 * <NumberField source="price" locales="fr-FR" options={{ style: 'currency', currency: 'USD' }} />
 * // renders the record { id: 1234, price: 25.99 } as
 * <span>25,99 $US</span>
 */
export var NumberField = memo(function (_a) {
    var className = _a.className, emptyText = _a.emptyText, record = _a.record, source = _a.source, locales = _a.locales, options = _a.options, textAlign = _a.textAlign, rest = __rest(_a, ["className", "emptyText", "record", "source", "locales", "options", "textAlign"]);
    if (!record) {
        return null;
    }
    var value = get(record, source);
    if (value == null) {
        return emptyText ? (React.createElement(Typography, __assign({ component: "span", variant: "body2", className: className }, sanitizeRestProps(rest)), emptyText)) : null;
    }
    return (React.createElement(Typography, __assign({ variant: "body2", component: "span", className: className }, sanitizeRestProps(rest)), hasNumberFormat
        ? value.toLocaleString(locales, options)
        : value));
});
// what? TypeScript looses the displayName if we don't set it explicitly
NumberField.displayName = 'NumberField';
NumberField.defaultProps = {
    addLabel: true,
    textAlign: 'right',
};
NumberField.propTypes = __assign(__assign(__assign({}, Typography.propTypes), fieldPropTypes), { locales: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]), options: PropTypes.object });
export default NumberField;

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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRefreshWhenVisible } from 'ra-core';
import RefreshIconButton from '../button/RefreshIconButton';
var useStyles = makeStyles(function (theme) { return ({
    loader: {
        margin: theme.spacing(2),
    },
    loadedIcon: {},
}); }, { name: 'RaLoadingIndicator' });
var LoadingIndicator = function (props) {
    var classesOverride = props.classes, className = props.className, rest = __rest(props, ["classes", "className"]);
    useRefreshWhenVisible();
    var loading = useSelector(function (state) { return state.admin.loading > 0; });
    var classes = useStyles(props);
    var theme = useTheme();
    return loading ? (React.createElement(CircularProgress, __assign({ className: classNames('app-loader', classes.loader, className), color: "inherit", size: theme.spacing(2), thickness: 6 }, rest))) : (React.createElement(RefreshIconButton, { className: classes.loadedIcon }));
};
LoadingIndicator.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    width: PropTypes.string,
};
export default LoadingIndicator;

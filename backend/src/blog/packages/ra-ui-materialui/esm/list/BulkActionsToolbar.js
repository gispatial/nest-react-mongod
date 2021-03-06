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
import { Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslate, sanitizeListRestProps, useListContext } from 'ra-core';
import TopToolbar from '../layout/TopToolbar';
var useStyles = makeStyles(function (theme) { return ({
    toolbar: {
        zIndex: 3,
        color: theme.palette.type === 'light'
            ? theme.palette.primary.main
            : theme.palette.text.primary,
        justifyContent: 'space-between',
        backgroundColor: theme.palette.type === 'light'
            ? lighten(theme.palette.primary.light, 0.85)
            : theme.palette.primary.dark,
        minHeight: theme.spacing(8),
        height: theme.spacing(8),
        transition: theme.transitions.create('height') + ", " + theme.transitions.create('min-height'),
    },
    buttons: {},
    collapsed: {
        minHeight: 0,
        height: 0,
        overflowY: 'hidden',
    },
    title: {
        display: 'flex',
        flex: '0 0 auto',
    },
    icon: {
        marginLeft: '-0.5em',
        marginRight: '0.5em',
    },
}); }, { name: 'RaBulkActionsToolbar' });
var BulkActionsToolbar = function (props) {
    var _a;
    var classesOverride = props.classes, _b = props.label, label = _b === void 0 ? 'ra.action.bulk_actions' : _b, children = props.children, rest = __rest(props, ["classes", "label", "children"]);
    var _c = useListContext(props), basePath = _c.basePath, filterValues = _c.filterValues, resource = _c.resource, selectedIds = _c.selectedIds, onUnselectItems = _c.onUnselectItems;
    var classes = useStyles(props);
    var translate = useTranslate();
    return (React.createElement(Toolbar, __assign({ "data-test": "bulk-actions-toolbar", className: classnames(classes.toolbar, (_a = {},
            _a[classes.collapsed] = selectedIds.length === 0,
            _a)) }, sanitizeListRestProps(rest)),
        React.createElement("div", { className: classes.title },
            React.createElement(IconButton, { className: classes.icon, "aria-label": translate('ra.action.unselect'), title: translate('ra.action.unselect'), onClick: onUnselectItems, size: "small" },
                React.createElement(CloseIcon, { fontSize: "small" })),
            React.createElement(Typography, { color: "inherit", variant: "subtitle1" }, translate(label, {
                _: label,
                smart_count: selectedIds.length,
            }))),
        React.createElement(TopToolbar, null, Children.map(children, function (child) {
            return isValidElement(child)
                ? cloneElement(child, {
                    basePath: basePath,
                    filterValues: filterValues,
                    resource: resource,
                    selectedIds: selectedIds,
                })
                : null;
        }))));
};
BulkActionsToolbar.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    label: PropTypes.string,
};
export default BulkActionsToolbar;

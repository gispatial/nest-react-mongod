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
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Report';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import History from '@material-ui/icons/History';
import { useTranslate } from 'ra-core';
import Title, { TitlePropType } from './Title';
var useStyles = makeStyles(function (theme) {
    var _a;
    return ({
        container: (_a = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            },
            _a[theme.breakpoints.down('sm')] = {
                padding: '1em',
            },
            _a.fontFamily = 'Roboto, sans-serif',
            _a.opacity = 0.5,
            _a),
        title: {
            display: 'flex',
            alignItems: 'center',
        },
        icon: {
            width: '2em',
            height: '2em',
            marginRight: '0.5em',
        },
        panel: {
            marginTop: '1em',
        },
        panelDetails: {
            whiteSpace: 'pre-wrap',
        },
        toolbar: {
            marginTop: '2em',
        },
    });
}, { name: 'RaError' });
function goBack() {
    window.history.go(-1);
}
var Error = function (props) {
    var error = props.error, errorInfo = props.errorInfo, classesOverride = props.classes, className = props.className, title = props.title, rest = __rest(props, ["error", "errorInfo", "classes", "className", "title"]);
    var classes = useStyles(props);
    var translate = useTranslate();
    return (React.createElement(Fragment, null,
        title && React.createElement(Title, { defaultTitle: title }),
        React.createElement("div", __assign({ className: classnames(classes.container, className) }, rest),
            React.createElement("h1", { className: classes.title, role: "alert" },
                React.createElement(ErrorIcon, { className: classes.icon }),
                translate('ra.page.error')),
            React.createElement("div", null, translate('ra.message.error')),
            process.env.NODE_ENV !== 'production' && (React.createElement(ExpansionPanel, { className: classes.panel },
                React.createElement(ExpansionPanelSummary, { expandIcon: React.createElement(ExpandMoreIcon, null) }, translate('ra.message.details')),
                React.createElement(ExpansionPanelDetails, { className: classes.panelDetails },
                    React.createElement("div", null,
                        React.createElement("h2", null, translate(error.toString())),
                        errorInfo && errorInfo.componentStack)))),
            React.createElement("div", { className: classes.toolbar },
                React.createElement(Button, { variant: "contained", startIcon: React.createElement(History, null), onClick: goBack }, translate('ra.action.back'))))));
};
Error.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    errorInfo: PropTypes.object,
    title: TitlePropType,
};
export default Error;

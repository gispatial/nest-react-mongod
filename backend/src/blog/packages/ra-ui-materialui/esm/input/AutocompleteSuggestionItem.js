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
import { isValidElement, cloneElement } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
var useStyles = makeStyles(function (theme) { return ({
    root: {
        fontWeight: 400,
    },
    selected: {
        fontWeight: 500,
    },
    suggestion: {
        display: 'block',
        fontFamily: theme.typography.fontFamily,
        minHeight: 24,
    },
    suggestionText: { fontWeight: 300 },
    highlightedSuggestionText: { fontWeight: 500 },
}); }, { name: 'RaAutocompleteSuggestionItem' });
var AutocompleteSuggestionItem = function (props) {
    var _a;
    var suggestion = props.suggestion, index = props.index, highlightedIndex = props.highlightedIndex, isSelected = props.isSelected, filterValue = props.filterValue, classesOverride = props.classes, getSuggestionText = props.getSuggestionText, rest = __rest(props, ["suggestion", "index", "highlightedIndex", "isSelected", "filterValue", "classes", "getSuggestionText"]);
    var classes = useStyles(props);
    var isHighlighted = highlightedIndex === index;
    var suggestionText = getSuggestionText(suggestion);
    var matches;
    var parts;
    if (!isValidElement(suggestionText)) {
        matches = match(suggestionText, filterValue);
        parts = parse(suggestionText, matches);
    }
    return (React.createElement(MenuItem, __assign({ key: suggestionText, selected: isHighlighted, className: classnames(classes.root, (_a = {},
            _a[classes.selected] = isSelected,
            _a)) }, rest), isValidElement(suggestionText) ? (cloneElement(suggestionText, { filterValue: filterValue })) : (React.createElement("div", { className: classes.suggestion }, parts.map(function (part, index) {
        return part.highlight ? (React.createElement("span", { key: index, className: classes.highlightedSuggestionText }, part.text)) : (React.createElement("strong", { key: index, className: classes.suggestionText }, part.text));
    })))));
};
export default AutocompleteSuggestionItem;

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
import * as React from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import { FieldTitle, useInput, warning } from 'ra-core';
import defaultSanitizeRestProps from './sanitizeRestProps';
import CheckboxGroupInputItem from './CheckboxGroupInputItem';
import InputHelperText from './InputHelperText';
import classnames from 'classnames';
var sanitizeRestProps = function (_a) {
    var setFilter = _a.setFilter, setPagination = _a.setPagination, setSort = _a.setSort, loaded = _a.loaded, rest = __rest(_a, ["setFilter", "setPagination", "setSort", "loaded"]);
    return defaultSanitizeRestProps(rest);
};
var useStyles = makeStyles(function (theme) { return ({
    root: {},
    label: {
        transform: 'translate(0, 8px) scale(0.75)',
        transformOrigin: "top " + (theme.direction === 'ltr' ? 'left' : 'right'),
    },
}); }, { name: 'RaCheckboxGroupInput' });
/**
 * An Input component for a checkbox group, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * The expected input must be an array of identifiers (e.g. [12, 31]) which correspond to
 * the 'optionValue' of 'choices' attribute objects.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *     { id: 12, name: 'Ray Hakt' },
 *     { id: 31, name: 'Ann Gullar' },
 *     { id: 42, name: 'Sean Phonee' },
 * ];
 * <CheckboxGroupInput source="recipients" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi' },
 *    { _id: 456, full_name: 'Jane Austen' },
 * ];
 * <CheckboxGroupInput source="recipients" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <CheckboxGroupInput source="recipients" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <CheckboxGroupInput source="recipients" choices={choices} optionText={<FullNameField />}/>
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'programming', name: 'myroot.category.programming' },
 *    { id: 'lifestyle', name: 'myroot.category.lifestyle' },
 *    { id: 'photography', name: 'myroot.category.photography' },
 * ];
 *
 * However, in some cases (e.g. inside a `<ReferenceArrayInput>`), you may not want
 * the choice to be translated. In that case, set the `translateChoice` prop to false.
 * @example
 * <CheckboxGroupInput source="gender" choices={choices} translateChoice={false}/>
 *
 * The object passed as `options` props is passed to the material-ui <Checkbox> components
 */
var CheckboxGroupInput = function (props) {
    var _a = props.choices, choices = _a === void 0 ? [] : _a, className = props.className, classesOverride = props.classes, format = props.format, helperText = props.helperText, label = props.label, _b = props.margin, margin = _b === void 0 ? 'dense' : _b, onBlur = props.onBlur, onChange = props.onChange, onFocus = props.onFocus, optionText = props.optionText, optionValue = props.optionValue, options = props.options, parse = props.parse, resource = props.resource, row = props.row, source = props.source, translate = props.translate, translateChoice = props.translateChoice, validate = props.validate, rest = __rest(props, ["choices", "className", "classes", "format", "helperText", "label", "margin", "onBlur", "onChange", "onFocus", "optionText", "optionValue", "options", "parse", "resource", "row", "source", "translate", "translateChoice", "validate"]);
    var classes = useStyles(props);
    warning(source === undefined, "If you're not wrapping the CheckboxGroupInput inside a ReferenceArrayInput, you must provide the source prop");
    warning(choices === undefined, "If you're not wrapping the CheckboxGroupInput inside a ReferenceArrayInput, you must provide the choices prop");
    var _c = useInput(__assign({ format: format,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        parse: parse,
        resource: resource,
        source: source,
        validate: validate }, rest)), id = _c.id, _d = _c.input, finalFormOnChange = _d.onChange, finalFormOnBlur = _d.onBlur, value = _d.value, isRequired = _c.isRequired, _e = _c.meta, error = _e.error, touched = _e.touched;
    var handleCheck = useCallback(function (event, isChecked) {
        var newValue;
        try {
            // try to convert string value to number, e.g. '123'
            newValue = JSON.parse(event.target.value);
        }
        catch (e) {
            // impossible to convert value, e.g. 'abc'
            newValue = event.target.value;
        }
        if (isChecked) {
            finalFormOnChange(__spreadArrays((value || []), [newValue]));
        }
        else {
            finalFormOnChange(value.filter(function (v) { return v != newValue; })); // eslint-disable-line eqeqeq
        }
        finalFormOnBlur(); // HACK: See https://github.com/final-form/react-final-form/issues/365#issuecomment-515045503
    }, [finalFormOnChange, finalFormOnBlur, value]);
    return (React.createElement(FormControl, __assign({ component: "fieldset", margin: margin, error: touched && !!error, className: classnames(classes.root, className) }, sanitizeRestProps(rest)),
        React.createElement(FormLabel, { component: "legend", className: classes.label },
            React.createElement(FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired })),
        React.createElement(FormGroup, { row: row }, choices.map(function (choice) { return (React.createElement(CheckboxGroupInputItem, { key: get(choice, optionValue), choice: choice, id: id, onChange: handleCheck, options: options, optionText: optionText, optionValue: optionValue, translateChoice: translateChoice, value: value })); })),
        React.createElement(FormHelperText, null,
            React.createElement(InputHelperText, { touched: touched, error: error, helperText: helperText }))));
};
CheckboxGroupInput.propTypes = {
    choices: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    label: PropTypes.string,
    source: PropTypes.string,
    options: PropTypes.object,
    optionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element,
    ]),
    optionValue: PropTypes.string,
    row: PropTypes.bool,
    resource: PropTypes.string,
    translateChoice: PropTypes.bool,
};
CheckboxGroupInput.defaultProps = {
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true,
    fullWidth: true,
    row: true,
};
export default CheckboxGroupInput;

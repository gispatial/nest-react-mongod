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
import * as React from 'react';
import { useEffect, useState } from 'react';
import inflection from 'inflection';
import { useShowController, InferredElement, getElementsFromRecords, } from 'ra-core';
import { ShowView } from './Show';
import showFieldTypes from './showFieldTypes';
var ShowViewGuesser = function (props) {
    var record = props.record, resource = props.resource;
    var _a = useState(null), inferredChild = _a[0], setInferredChild = _a[1];
    useEffect(function () {
        if (record && !inferredChild) {
            var inferredElements = getElementsFromRecords([record], showFieldTypes);
            var inferredChild_1 = new InferredElement(showFieldTypes.show, null, inferredElements);
            process.env.NODE_ENV !== 'production' &&
                // eslint-disable-next-line no-console
                console.log("Guessed Show:\n\nexport const " + inflection.capitalize(inflection.singularize(resource)) + "Show = props => (\n    <Show {...props}>\n" + inferredChild_1.getRepresentation() + "\n    </Show>\n);");
            setInferredChild(inferredChild_1.getElement());
        }
    }, [record, inferredChild, resource]);
    return React.createElement(ShowView, __assign({}, props), inferredChild);
};
ShowViewGuesser.propTypes = ShowView.propTypes;
var ShowGuesser = function (props) { return (React.createElement(ShowViewGuesser, __assign({}, props, useShowController(props)))); };
export default ShowGuesser;

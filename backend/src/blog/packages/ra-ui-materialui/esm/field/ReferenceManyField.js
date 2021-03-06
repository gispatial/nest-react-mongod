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
import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import { useReferenceManyFieldController, ListContextProvider, } from 'ra-core';
import { fieldPropTypes } from './types';
import sanitizeRestProps from './sanitizeRestProps';
/**
 * Render related records to the current one.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 *
 * @example Display all the books by the current author, only the title
 * <ReferenceManyField reference="books" target="author_id">
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>
 *
 * By default, restricts the displayed values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceManyField perPage={10} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceManyField sort={{ field: 'created_at', order: 'DESC' }} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceManyField filter={{ is_published: true }} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 */
export var ReferenceManyField = function (props) {
    var basePath = props.basePath, children = props.children, filter = props.filter, _a = props.page, page = _a === void 0 ? 1 : _a, perPage = props.perPage, record = props.record, reference = props.reference, resource = props.resource, sort = props.sort, source = props.source, target = props.target;
    if (React.Children.count(children) !== 1) {
        throw new Error('<ReferenceManyField> only accepts a single child (like <Datagrid>)');
    }
    var controllerProps = useReferenceManyFieldController({
        basePath: basePath,
        filter: filter,
        page: page,
        perPage: perPage,
        record: record,
        reference: reference,
        resource: resource,
        sort: sort,
        source: source,
        target: target,
    });
    return (React.createElement(ListContextProvider, { value: controllerProps },
        React.createElement(ReferenceManyFieldView, __assign({}, props, controllerProps))));
};
ReferenceManyField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    filter: PropTypes.object,
    label: PropTypes.string,
    perPage: PropTypes.number,
    record: PropTypes.any,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string,
    sortBy: PropTypes.string,
    sortByOrder: fieldPropTypes.sortByOrder,
    source: PropTypes.string.isRequired,
    sort: PropTypes.exact({
        field: PropTypes.string,
        order: PropTypes.string,
    }),
    target: PropTypes.string.isRequired,
};
ReferenceManyField.defaultProps = {
    filter: {},
    perPage: 25,
    sort: { field: 'id', order: 'DESC' },
    source: 'id',
    addLabel: true,
};
export var ReferenceManyFieldView = function (props) {
    var basePath = props.basePath, children = props.children, pagination = props.pagination, reference = props.reference, rest = __rest(props, ["basePath", "children", "pagination", "reference"]);
    return (React.createElement(React.Fragment, null,
        cloneElement(Children.only(children), __assign(__assign({}, sanitizeRestProps(rest)), { basePath: basePath, resource: reference })),
        pagination &&
            props.total !== undefined &&
            cloneElement(pagination, rest)));
};
ReferenceManyFieldView.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.element,
    className: PropTypes.string,
    currentSort: PropTypes.exact({
        field: PropTypes.string,
        order: PropTypes.string,
    }),
    data: PropTypes.any,
    ids: PropTypes.array,
    loaded: PropTypes.bool,
    pagination: PropTypes.element,
    reference: PropTypes.string,
    setSort: PropTypes.func,
};
export default ReferenceManyField;

import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { useTranslate } from 'ra-core';
import classnames from 'classnames';
var useStyles = makeStyles(function (theme) { return ({
    actions: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: 20,
    },
    button: {},
    currentPageButton: {},
    hellip: { padding: '1.2em' },
}); }, { name: 'RaPaginationActions' });
function PaginationActions(props) {
    var page = props.page, rowsPerPage = props.rowsPerPage, count = props.count, onChangePage = props.onChangePage, color = props.color, size = props.size;
    var classes = useStyles(props);
    var translate = useTranslate();
    var theme = useTheme();
    /**
     * Warning: material-ui's page is 0-based
     */
    var range = function () {
        var nbPages = Math.ceil(count / rowsPerPage) || 1;
        if (isNaN(page) || nbPages === 1) {
            return [];
        }
        var input = [];
        // display page links around the current page
        if (page > 1) {
            input.push(1);
        }
        if (page === 3) {
            input.push(2);
        }
        if (page > 3) {
            input.push('.');
        }
        if (page > 0) {
            input.push(page);
        }
        input.push(page + 1);
        if (page < nbPages - 1) {
            input.push(page + 2);
        }
        if (page === nbPages - 4) {
            input.push(nbPages - 1);
        }
        if (page < nbPages - 4) {
            input.push('.');
        }
        if (page < nbPages - 2) {
            input.push(nbPages);
        }
        return input;
    };
    var getNbPages = function () { return Math.ceil(count / rowsPerPage) || 1; };
    var prevPage = function (event) {
        if (page === 0) {
            throw new Error(translate('ra.navigation.page_out_from_begin'));
        }
        onChangePage(event, page - 1);
    };
    var nextPage = function (event) {
        if (page > getNbPages() - 1) {
            throw new Error(translate('ra.navigation.page_out_from_end'));
        }
        onChangePage(event, page + 1);
    };
    var gotoPage = function (event) {
        var page = parseInt(event.currentTarget.dataset.page, 10);
        if (page < 0 || page > getNbPages() - 1) {
            throw new Error(translate('ra.navigation.page_out_of_boundaries', {
                page: page + 1,
            }));
        }
        onChangePage(event, page);
    };
    var renderPageNums = function () {
        return range().map(function (pageNum, index) {
            var _a;
            return pageNum === '.' ? (React.createElement("span", { key: "hyphen_" + index, className: classes.hellip }, "\u2026")) : (React.createElement(Button, { size: size, className: classnames('page-number', classes.button, (_a = {},
                    _a[classes.currentPageButton] = pageNum === page + 1,
                    _a)), color: pageNum === page + 1 ? 'default' : color, key: pageNum, "data-page": pageNum - 1, onClick: gotoPage }, pageNum));
        });
    };
    var nbPages = getNbPages();
    if (nbPages === 1) {
        return React.createElement("div", { className: classes.actions });
    }
    return (React.createElement("div", { className: classes.actions },
        page > 0 && (React.createElement(Button, { color: color, size: size, key: "prev", onClick: prevPage, className: "previous-page" },
            theme.direction === 'rtl' ? (React.createElement(ChevronRight, null)) : (React.createElement(ChevronLeft, null)),
            translate('ra.navigation.prev'))),
        renderPageNums(),
        page !== nbPages - 1 && (React.createElement(Button, { color: color, size: size, key: "next", onClick: nextPage, className: "next-page" },
            translate('ra.navigation.next'),
            theme.direction === 'rtl' ? (React.createElement(ChevronLeft, null)) : (React.createElement(ChevronRight, null))))));
}
/**
 * PaginationActions propTypes are copied over from material-ui’s
 * TablePaginationActions propTypes. See
 * https://github.com/mui-org/material-ui/blob/869692ecf3812bc4577ed4dde81a9911c5949695/packages/material-ui/src/TablePaginationActions/TablePaginationActions.js#L53-L85
 * for reference.
 */
PaginationActions.propTypes = {
    backIconButtonProps: PropTypes.object,
    count: PropTypes.number.isRequired,
    classes: PropTypes.object,
    nextIconButtonProps: PropTypes.object,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    color: PropTypes.oneOf(['primary', 'secondary']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    theme: PropTypes.object,
};
PaginationActions.defaultProps = {
    color: 'primary',
    size: 'small',
};
export default React.memo(PaginationActions);

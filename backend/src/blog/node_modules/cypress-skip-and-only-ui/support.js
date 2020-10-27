"use strict";
/// <reference types="cypress" />
Object.defineProperty(exports, "__esModule", { value: true });
var support_utils_1 = require("./support-utils");
var React = require('react');
var ReactDOM = require('react-dom');
var addOnlySkipButtons = function ($runnableTitle, title, spec) {
    var onClickSkip = function () {
        console.log('onClickSkip', title, spec);
        cy.task('skipTests', {
            filename: spec.absolute,
            title: title
        });
    };
    var onClickOnly = function () {
        console.log('onClickOnly', title, spec);
        cy.task('onlyTests', {
            filename: spec.absolute,
            title: title
        });
    };
    var onNormal = function () {
        console.log('onNormal', title, spec);
        cy.task('allTests', {
            filename: spec.absolute,
            title: title
        });
    };
    var buttons = (React.createElement("span", null,
        ' ',
        React.createElement("i", { className: 'fa fa-circle-o-notch', title: 'Skip this test', onClick: onClickSkip }),
        ' ',
        React.createElement("i", { className: 'fa fa-arrow-circle-left', title: 'Run only this test', onClick: onClickOnly }),
        ' ',
        React.createElement("i", { className: 'fa fa-list-ul', title: 'Remove skip or only', onClick: onNormal })));
    var $buttons = Cypress.$('<span class="only-skip" style="margin-left: 1em" />')[0];
    $runnableTitle.after($buttons);
    ReactDOM.render(buttons, $buttons);
};
after(function () {
    // TODO auto retry until there are .runnable-title elements present
    setTimeout(function () {
        console.log('after all tests');
        var $ = Cypress.$;
        var findParentTitles = function (rt, title) {
            if (title === void 0) { title = []; }
            title.push(rt.firstChild.textContent);
            var $parent = $(rt).parents('li.suite');
            if ($parent.length && $parent[0] !== rt) {
                $parent.each(function (k, el) {
                    var titleEl = el.querySelector('.collapsible-header > .runnable-title');
                    if (titleEl !== rt) {
                        title.push(titleEl.textContent);
                    }
                });
            }
            return title;
        };
        // @ts-ignore
        var runnable = cy.state('runnable');
        var root = support_utils_1.getRootSuite(runnable);
        // console.log(root)
        var titles = support_utils_1.getTests(root);
        // console.table(titles)
        var humanTitles = titles.map(function (title) { return title.join(' - '); });
        console.log(humanTitles.join('\n'));
        // @ts-ignore
        $.find('.runnable-title').map(function (rt) {
            var uiTitle = findParentTitles(rt) || [];
            uiTitle.reverse();
            console.log('ui title', uiTitle);
            if (titles.some(function (testTitle) { return Cypress._.isEqual(testTitle, uiTitle); })) {
                console.log('found matching test', uiTitle);
                addOnlySkipButtons(rt, uiTitle, Cypress.spec);
            }
        });
        // console.log('UI titles')
        // console.log(fullTitles.join('\n'))
        // titles.forEach(title => {
        //   // @ts-ignore
        //   const $runnableTitle = $.find(
        //     `.runnable-title:contains('${title}')`
        //   )
        //   if (!$runnableTitle.length) {
        //     return
        //   }
        //   console.log($runnableTitle)
        //   addOnlySkipButtons($runnableTitle[0], title, Cypress.spec)
        // })
    }, 500);
    // Cypress.$.find('.runnable-title')
});

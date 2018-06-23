var sgmllint = require("../sgmllint");

exports.sgmllint = {
    testEmpty: function (test) {
        sgmllint('');
        test.done();
    },
    testText: function (test) {
        sgmllint('Hello');
        test.done();
    },
    tag: {
        // testMatchedClosing: function (test) {
        //     sgmllint('<foo></foo>');
        //     test.done();
        // },
        // testUnmatchedClosing: function (test) {
        //     test.throws(function () {
        //         sgmllint('<foo></bar>');
        //     });
        //     test.done();
        // },
        // testMissingClosing: function (test) {
        //     test.throws(function () {
        //         sgmllint('<foo>');
        //     });
        //     test.done();
        // },
        testWithText: function (test) {
            sgmllint('<foo>Hello</foo>');
            test.done();
        },
        testWithChild: function (test) {
            sgmllint('<foo><bar></bar></foo>');
            test.done();
        }
    },
    attribute: {
        // testWithoutValue: function (test) {
        //     sgmllint('<foo a></foo>');
        //     test.done();
        // },
        // testWithValue: function (test) {
        //     sgmllint('<foo a="1"></foo>');
        //     test.done();
        // }
    }
};

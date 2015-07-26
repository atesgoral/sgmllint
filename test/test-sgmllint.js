var sgmllint = require("../sgmllint");

exports.sgmllint = {
    testEmpty: function (test) {
        sgmllint("");
        test.done();
    },
    testText: function (test) {
        sgmllint("Hello");
        test.done();
    },
    element: {
        testMatchedClosing: function (test) {
            sgmllint("<foo></foo>");
            test.done();
        },
        testUnmatchedClosing: function (test) {
            test.throws(function () {
                sgmllint("<foo></bar>");
            });
            test.done();
        }
    }
};

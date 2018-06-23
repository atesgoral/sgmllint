require("array.from");

module.exports = function (raw) {
    var state;

    function setState(newState) {
        state = {
            name: newState,
            start: current,
            line: line,
            column: column
        };
    }

    function assert(cond, message) {
        if (!cond) {
            throw new Error(message); // @todo include state.line and state.column
        }
    }

    var stateHandlerMap = {
        text: function (c) {
            if (c === "<") {
                setState("tag");
            }
        },
        tag: function (c) {
            if (c === "/") {
                setState("closing_tag");
            } else {
                assert(tagNameFirstChar.test(c), "Invalid first character in tag name");
                setState("opening_tag");
            }
        },
        opening_tag: function (c) {
            if (whitespace.test(c)) {
                setState("attributes");
            } else {
                assert(tagNameChar.test(c), "Invalid character in tag name");
            }
        },
        closing_tag: function (c) {
            if (c === ">") {

                setState("text");
            } else {

            }
        },
        attributes: function (c) {

        }
    };

    setState("text");

    var charList = Array.from(raw),
        current = 0,
        line = 1,
        column = 1,
        c;

    while (current < charList.length) {
        c = charList[current];

        if (/\n/.test(c)) {
            line++;
            column = 1;
        }

        stateHandlerMap[state.name](c);

        current++;
    }
};

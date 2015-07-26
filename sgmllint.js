require("array.from");

module.exports = function (raw) {
    var whitespace = /\s/;

    function assert(cond, message) {
        if (!cond) {
            throw new Error(message);
        }
    }

    function Text() {
        var s = "";

        this.process = function (c) {
            if (c === "<") {
                return new ElementName();
            } else {
                s += c;
                return this;
            }
        };
    }

    function ElementName() {
        var s = "";

        this.process = function (c) {
            if (whitespace.test(c)) {
                if (s.charAt(0) === "/") {
                    assert(s.substr(1) === elementStack.pop(), "Unmatched closing element: <" + s + ">");
                } else {
                    elementStack.push(s);
                }
                return new AttributeName();
            } else if (c === ">") {
                if (s.charAt(0) === "/") {
                    assert(s.substr(1) === elementStack.pop(), "Unmatched closing element: <" + s + ">");
                } else {
                    elementStack.push(s);
                }
                return new Text();
            } else {
                s += c;
                return this;
            }
        };
    }

    function AttributeName() {
        var s = "";

        this.process = function (c) {
            if (whitespace.test(c)) {
                return new AttributeName();
            } else if (c === ">") {
                return new Text();
            } else if (c === "=") {
                return new AttributeValue();
            } else {
                s += c;
                return this;
            }
        };
    }

    function AttributeValue() {
        var s = "";

        this.process = function (c) {
            if (whitespace.test(c)) {
                return new AttributeName();
            } else if (c === ">") {
                return new Text();
            } else {
                s += c;
                return this;
            }
        };
    }

    var charList = Array.from(raw),
        state = new Text(),
        elementStack = [];

    while (charList.length) {
        state = state.process(charList.shift());
    }
};

require("array.from");

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
            console.log("Text", s);
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
            console.log("ElementName", s);
            if (s.charAt(0) === "/") {
                assert(s.substr(1) === elementStack.pop(), "Unmatched closing element: <" + s + ">");
            } else {
                elementStack.push(s);
            }
            return new AttributeName();
        } else if (c === ">") {
            console.log("ElementName", s);
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
            console.log("AttributeName", s);
            return new AttributeName();
        } else if (c === ">") {
            console.log("AttributeName", s);
            return new Text();
        } else if (c === "=") {
            console.log("AttributeName", s);
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
            console.log("AttributeValue", s);
            return new AttributeName();
        } else if (c === ">") {
            console.log("AttributeValue", s);
            return new Text();
        } else {
            s += c;
            return this;
        }
    };
}

var raw = '<foo a="1" b="2">Hello<bar>World</bar></foo>';

console.log("raw", raw);

var charList = Array.from(raw),
    state = new Text(),
    elementStack = [];

while (charList.length) {
    state = state.process(charList.shift());
}

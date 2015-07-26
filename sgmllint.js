require("array.from");

var whitespace = /\s/;

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
            return new AttributeName();
        } else if (c === ">") {
            console.log("ElementName", s);
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
    state = new Text();

while (charList.length) {
    state = state.process(charList.shift());
}

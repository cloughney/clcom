Function.prototype.getName = function () {
    if (this.name === "") {
        return "Anonymous";
    }
    return this.name === undefined
        ? (/function\s([^(]+)/).exec(this.toString())[1]
        : this.name;
};

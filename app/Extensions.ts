interface Function {
    getName(): string;
}

Function.prototype.getName = function (): string {
    if (this.name === "") { return "Anonymous"; }
    return this.name === undefined
        ? (/function\s([^(]+)/).exec(this.toString())[1]
        : this.name;
}

import ko = require('knockout');
import $ = require('jquery');

class AboutView {
    private consoleFocusCheckTimer: number;

    constructor() {
        this.consoleHasFocus = ko.observable(true);

        this.prompt = ko.observable("> ");
        this.input = ko.observable("");
        this.output = ko.observable("");
    }

    public consoleHasFocus: KnockoutObservable<boolean>;
    public prompt: KnockoutObservable<string>;
    public input: KnockoutObservable<string>;
    public output: KnockoutObservable<string>;

    public onKeyPress(model: AboutView, e: KeyboardEvent) {
        var keyCode = e.which || e.keyCode || -1;

        if (keyCode === -1) { return; } //TODO display error message on blur div

        switch (keyCode) {
            case 8: //backspace
                var input = model.input();
                input = input.substr(0, input.length - 1);
                model.input(input);
                return;
            case 13:
                model.handleCommand(model.input());
                return;
            case 37: //arrow keys
            case 38:
            case 39:
            case 40:
                return;
            default:
                console.log(keyCode);
                break;
        }

        var input = model.input() + String.fromCharCode(keyCode);
        model.input(input);
    };

    public onConsoleBlurClick(model: AboutView) {
        this.consoleHasFocus(true);
    }

    private handleCommand = (command: string) => {
        var output = this.output() + this.prompt() + this.input() + "<br>";
        this.output(output);
        this.input("");
        var cmdPiece = command.split(" ");
        if (cmdPiece[0].toLowerCase() === "cd") {
            if (cmdPiece.length > 1) {
                this.prompt(cmdPiece[1] + "> ");
            }
        }
    };
}

export = AboutView;

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

    /** Handles the 'onkeydown' event and handles command keypresses */
    public onKeyDown(model: AboutView, e: KeyboardEvent): boolean {
        var keyCode = e.keyCode || e.which || -1;
        if (keyCode === -1) { return true; } //TODO display error message on blur div

        switch (keyCode) {
            case 8: //backspace
                var input = model.input();
                input = input.substr(0, input.length - 1);
                model.input(input);
                return false;
            case 13:
                model.handleCommand(model.input());
                return false;
            case 37: //arrow keys
            case 38:
            case 39:
            case 40:
                return;
            default:
                if (keyCode >= 33 && keyCode <= 126 && !e.shiftKey) {
                    return false;
                }

                console.log(keyCode);
                break;
        }

        return true;
    }

    /** Handles the 'onkeypress' event and appends visible characters to the input */
    public onKeyPress(model: AboutView, e: KeyboardEvent): boolean {
        var charCode = e.keyCode || e.which || -1;
        if (charCode === -1) { return true; } //TODO display error message on blur div

        // switch (keyCode) {
        //     case 8: //backspace
        //         var input = model.input();
        //         input = input.substr(0, input.length - 1);
        //         model.input(input);
        //         return false;
        //     case 13:
        //         model.handleCommand(model.input());
        //         return false;
        //     case 37: //arrow keys
        //     case 38:
        //     case 39:
        //     case 40:
        //         return;
        //     default:
        //         if (keyCode >= 33 && keyCode <= 126 && !e.shiftKey) {
        //             return false;
        //         }
        //
        //         console.log(keyCode);
        //         break;
        // }

        console.log(charCode + "");

        if (charCode >= 33 && charCode <= 126 && !e.shiftKey) {
            var char = String.fromCharCode(charCode);
            model.input(model.input() + char);
            return false;
        }

        return true;
    };

    public onConsoleBlurClick(model: AboutView): void {
        this.consoleHasFocus(true);
    }

    private handleCommand = (command: string): void => {
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

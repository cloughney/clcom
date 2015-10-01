var Klochwork;
(function (Klochwork) {
    var Console;
    (function (Console) {
        var SimpleConsole = (function () {
            function SimpleConsole(onStdOut) {
                var _this = this;
                this.init = function () {
                    _this.commandHistory = [];
                };
                this.onStdIn = function (input) {
                    var inputTokens = input.split(" ");
                    var command = Console.Commands.ConsoleCommandFactory.getFromCommandText(inputTokens[0]);
                    if (!command) {
                        _this.onStdOut(SimpleConsole.noCommandMessage);
                        return;
                    }
                    command.execute(inputTokens.slice(1)).done(function (output) {
                        _this.onStdOut(output);
                    }).fail(function (ex) {
                        _this.onStdOut(ex.message);
                    });
                    _this.commandHistory.push(input);
                };
                this.onStdOut = onStdOut;
            }
            SimpleConsole.noCommandMessage = "No such command.";
            return SimpleConsole;
        })();
        Console.SimpleConsole = SimpleConsole;
    })(Console = Klochwork.Console || (Klochwork.Console = {}));
})(Klochwork || (Klochwork = {}));
var Klochwork;
(function (Klochwork) {
    var Console;
    (function (Console) {
        var Commands;
        (function (Commands) {
            var ConsoleCommandFactory = (function () {
                function ConsoleCommandFactory() {
                }
                ConsoleCommandFactory.registerCommand = function (commandText, commandClass) {
                    ConsoleCommandFactory.commandMap[commandText] = commandClass;
                    console.log("Registered: " + commandText);
                };
                ConsoleCommandFactory.getFromCommandText = function (commandText) {
                    var CommandClass = ConsoleCommandFactory.commandMap[commandText];
                    return CommandClass ? new CommandClass() : null;
                };
                ConsoleCommandFactory.getRegisteredCommands = function () {
                    var output = new Array();
                    for (var prop in ConsoleCommandFactory.commandMap) {
                        if (ConsoleCommandFactory.commandMap.hasOwnProperty(prop)) {
                            output.push(prop.toLowerCase());
                        }
                    }
                    return output.sort();
                };
                ConsoleCommandFactory.commandMap = {};
                return ConsoleCommandFactory;
            })();
            Commands.ConsoleCommandFactory = ConsoleCommandFactory;
            var HelpCommand = (function () {
                function HelpCommand() {
                }
                HelpCommand.prototype.execute = function (parameters) {
                    var $d = jQuery.Deferred();
                    var commands = ConsoleCommandFactory.getRegisteredCommands();
                    var output = "--------------------<br>";
                    output += "Available commands:<br>";
                    for (var i = 0; i < commands.length; i++) {
                        output += "&nbsp;&nbsp;-&nbsp;" + commands[i] + "<br>";
                    }
                    output += "--------------------";
                    $d.resolve(output);
                    return $d.promise();
                };
                return HelpCommand;
            })();
            Commands.HelpCommand = HelpCommand;
            var YodaSpeakCommand = (function () {
                function YodaSpeakCommand() {
                }
                YodaSpeakCommand.prototype.execute = function (parameters) {
                    var $d = jQuery.Deferred();
                    var firstParam = parameters[0];
                    var helpFlags = ["--h", "-h", "--help", "-h"];
                    if (!firstParam || helpFlags.indexOf(firstParam) !== -1) {
                        $d.resolve("Usage: yoda &lt;phrase to be yoda-fied&gt;");
                        return $d.promise();
                    }
                    $.ajax({
                        url: 'https://yoda.p.mashape.com/yoda',
                        method: 'GET',
                        traditional: true,
                        data: { sentence: parameters.join(" ") },
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("X-Mashape-Key", window["mashapeApiKey"]);
                        }
                    }).done(function (data) {
                        $d.resolve(data);
                    }).fail(function () {
                        $d.reject({ message: "Failed to make API call!" });
                    });
                    return $d.promise();
                };
                return YodaSpeakCommand;
            })();
            Commands.YodaSpeakCommand = YodaSpeakCommand;
            var QuoteCommand = (function () {
                function QuoteCommand() {
                }
                QuoteCommand.prototype.execute = function (params) {
                    var $d = jQuery.Deferred();
                    var firstParam = params[0];
                    var helpFlags = ["--h", "-h", "--help", "-h"];
                    if (helpFlags.indexOf(firstParam) !== -1) {
                        $d.resolve("Usage: quote [category]");
                        return $d.promise();
                    }
                    $.ajax({
                        url: 'https://andruxnet-random-famous-quotes.p.mashape.com' + (firstParam ? '/cat=' + firstParam : ''),
                        method: 'POST',
                        contentType: 'application/json',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("X-Mashape-Key", window["mashapeApiKey"]);
                        }
                    }).done(function (response) {
                        var data = JSON.parse(response);
                        var output = "";
                        output += "\"" + data.quote + "\"<br>";
                        output += "&nbsp;-&nbsp;" + data.author + "&nbsp;(" + data.category + ")";
                        $d.resolve(output);
                    }).fail(function () {
                        $d.reject({ message: "Failed to make API call!" });
                    });
                    return $d.promise();
                };
                return QuoteCommand;
            })();
            Commands.QuoteCommand = QuoteCommand;
            ConsoleCommandFactory.registerCommand("help", HelpCommand);
            ConsoleCommandFactory.registerCommand("yoda", YodaSpeakCommand);
            ConsoleCommandFactory.registerCommand("quote", QuoteCommand);
        })(Commands = Console.Commands || (Console.Commands = {}));
    })(Console = Klochwork.Console || (Klochwork.Console = {}));
})(Klochwork || (Klochwork = {}));

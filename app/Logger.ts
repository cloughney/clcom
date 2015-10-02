import AppConfig = require('./AppConfig');

class Logger {
    private isDebugMode: boolean;

    constructor(private loggerName: string) {
        var appConfig = AppConfig.get();
        this.isDebugMode = appConfig.debug || false;
    }

    public debug = (msg: string) => {
        if (this.isDebugMode) {
            console.log("DEBUG - (" + this.loggerName + ") : " + msg);
        }
    }
}

export = Logger;

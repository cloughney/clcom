define(["require", "exports", './AppConfig'], function (require, exports, AppConfig) {
    var Logger = (function () {
        function Logger(loggerName) {
            var _this = this;
            this.loggerName = loggerName;
            this.debug = function (msg) {
                if (_this.isDebugMode) {
                    console.log("DEBUG - (" + _this.loggerName + ") : " + msg);
                }
            };
            var appConfig = AppConfig.get();
            this.isDebugMode = appConfig.debug || false;
        }
        return Logger;
    })();
    return Logger;
});

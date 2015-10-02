define(["require", "exports"], function (require, exports) {
    var AppConfig = (function () {
        function AppConfig() {
            this.debug = true;
            this.routeConfig = {
                defaultRoute: "dashboard",
                routes: {}
            };
        }
        AppConfig.load = function () {
            var $d = jQuery.Deferred();
            if (AppConfig.instance) {
                $d.resolve(AppConfig.instance);
                return $d.promise();
            }
            AppConfig.instance = new AppConfig();
            $d.resolve(AppConfig.instance);
            return $d;
        };
        AppConfig.get = function () {
            if (!AppConfig.instance) {
                throw "Fatal: AppConfig has not been loaded.";
            }
            return AppConfig.instance;
        };
        return AppConfig;
    })();
    return AppConfig;
});

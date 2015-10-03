define(["require", "exports", 'jquery'], function (require, exports, $) {
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
            $.ajax({
                url: "config.json",
                method: "GET"
            }).done(function (config) {
                if (!config) {
                    $d.reject("Error: Received invalid configuration from server.");
                    return $d;
                }
                $.each(config, function (key, value) {
                    if (AppConfig.instance.hasOwnProperty(key)) {
                        AppConfig.instance[key] = value;
                    }
                });
                $d.resolve(AppConfig.instance);
            }).fail(function () {
                $d.reject("Error: Failed to load remote configuration.");
            });
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

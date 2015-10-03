import $ = require('jquery');

class AppConfig {
    private static instance: AppConfig;

    public debug: boolean = true;

    public routeConfig: RouteConfig = {
        defaultRoute: "dashboard",
        routes: {

        }
    };

    public static load(): JQueryPromise<AppConfig> {
        var $d = jQuery.Deferred();

        if (AppConfig.instance) {
            $d.resolve(AppConfig.instance);
            return $d.promise();
        }

        AppConfig.instance = new AppConfig();

        $.ajax({
            url: "config.json",
            method: "GET"
        }).done((config: AppConfig) => {
            if (!config) { //TODO better check for invalid data
                $d.reject("Error: Received invalid configuration from server.");
                return $d;
            }

            $.each(config, (key, value) => {
                if (AppConfig.instance.hasOwnProperty(key)) {
                    AppConfig.instance[key] = value;
                }
            });
            $d.resolve(AppConfig.instance);
        }).fail(() => {
            $d.reject("Error: Failed to load remote configuration.");
        });

        return $d;
    }

    public static get(): AppConfig {
        if (!AppConfig.instance) { throw "Fatal: AppConfig has not been loaded."; }
        return AppConfig.instance;
    }
}

export = AppConfig;

define(["require", "exports", 'knockout', './Events', './models/Route'], function (require, exports, ko, Events, Route) {
    var Router = (function () {
        function Router(routeConfig) {
            var _this = this;
            this.routeConfig = routeConfig;
            this.defaultRouteRegex = /^#\/?$/;
            this.routeMap = {};
            this.getCleanPath = function () {
                var path = window.location.hash;
                if (!path || path.length < 3 || _this.defaultRouteRegex.test(path)) {
                    return "";
                }
                path = path.substr(1);
                if (path.indexOf("/") === 0) {
                    path = path.substr(1);
                }
                return path;
            };
            this.getRouteFromPath = function (path) {
                var routePieces = path.split("/");
                var area = routePieces[0];
                var point = routePieces.length > 1 ? routePieces[1] : "";
                if (!area || !ko.components.isRegistered(area + "-view")) {
                    area = _this.routeConfig.defaultRoute;
                    point = "";
                }
                return new Route(area, point);
            };
            this.activeRoute = function () {
                var path = _this.getCleanPath();
                return _this.getRouteFromPath(path);
            };
            Events.subscribe(Events.hashChange, "klochwork.Router", function () { return Events.trigger(Events.routeUpdate, _this.activeRoute()); });
        }
        return Router;
    })();
    return Router;
});

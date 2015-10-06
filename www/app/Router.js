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
            this.resolveRoute = function (path) {
                var routePieces = path.split("/");
                var area = routePieces[0];
                var point = routePieces.length > 1 ? routePieces[1] : "";
                area = _this.routeMap.hasOwnProperty(area)
                    ? _this.routeMap[area]
                    : area;
                if (!area) {
                    return _this.resolveRoute(_this.routeConfig.defaultRoute);
                }
                if (!ko.components.isRegistered(area + "-view")) {
                    return _this.resolveRoute(_this.routeConfig.notFoundRoute);
                }
                return new Route(area, point);
            };
            this.activeRoute = function () {
                var path = _this.getCleanPath();
                return _this.resolveRoute(path);
            };
            this.routeMap = routeConfig.routes;
            Events.subscribe(Events.hashChange, Router.getName(), function () { return Events.trigger(Events.routeUpdate, _this.activeRoute()); });
        }
        return Router;
    })();
    return Router;
});

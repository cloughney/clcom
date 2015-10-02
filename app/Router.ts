import $ = require('jquery');
import ko = require('knockout');
import Events = require('./Events');
import Route = require('./models/Route');

class Router {
    private defaultRouteRegex = /^#\/?$/;
    private routeMap: { [path: string]: {} } = {};

    constructor(private routeConfig: RouteConfig) {
        Events.subscribe(Events.hashChange, "klochwork.Router",
            () => Events.trigger(Events.routeUpdate, this.activeRoute()));
    }

    private getCleanPath = () => {
        var path = window.location.hash;
        if (!path || path.length < 3 || this.defaultRouteRegex.test(path)) { return ""; }

        path = path.substr(1);
        if (path.indexOf("/") === 0) {
            path = path.substr(1);
        }

        return path;
    }

    private getRouteFromPath = (path: string) => {
        var routePieces = path.split("/");
        var area = routePieces[0];
        var point = routePieces.length > 1 ? routePieces[1] : "";

        if (!area || !ko.components.isRegistered(area + "-view")) {
            area = this.routeConfig.defaultRoute;
            point = "";
        }

        return new Route(area, point);
    }

    public activeRoute = (): Route => {
        var path = this.getCleanPath();
        return this.getRouteFromPath(path);
    }
}

export = Router;

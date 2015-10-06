import $ = require('jquery');
import ko = require('knockout');
import Events = require('./Events');
import Route = require('./models/Route');

class Router {
    private defaultRouteRegex = /^#\/?$/;
    private routeMap: { [path: string]: string } = {};

    constructor(private routeConfig: RouteConfig) {
        this.routeMap = routeConfig.routes;
        Events.subscribe(Events.hashChange, Router.getName(),
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

    private resolveRoute = (path: string): Route => {
        var routePieces = path.split("/");
        var area = routePieces[0];
        var point = routePieces.length > 1 ? routePieces[1] : "";

        area = this.routeMap.hasOwnProperty(area)
            ? this.routeMap[area]
            : area;

        if (!area) {
            return this.resolveRoute(this.routeConfig.defaultRoute);
        }

        if (!ko.components.isRegistered(area + "-view")) {
            return this.resolveRoute(this.routeConfig.notFoundRoute);
        }

        return new Route(area, point);
    }

    public activeRoute = (): Route => {
        var path = this.getCleanPath();
        return this.resolveRoute(path);
    }
}

export = Router;

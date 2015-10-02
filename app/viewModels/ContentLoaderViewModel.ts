import ko = require('knockout');

import Logger = require('../Logger');
import Events = require('../Events');
import Route = require("../models/Route")

class ContentLoaderViewModel {
    private static className = "klochwork.viewModels.ContentLoaderViewModel";
    private log: Logger;
    private activeRoute: Route;

    constructor() {
        this.log = new Logger(ContentLoaderViewModel.getName());
        this.activeComponentName = ko.observable<string>();

        Events.subscribe(Events.routeUpdate, "",
            (data: {}) => {
                var route = Events.getRouteUpdateData(data);
                if (route) { this.updateContent(route); }
            });
    }

    public activeComponentName: KnockoutObservable<string>;

    public updateContent = (route: Route): void => {
        if (route.equals(this.activeRoute)) {
            return;
        }

        this.log.debug("Updating route to '" + route.getPath() + "'");
        var componentName = route.getComponentName();
        this.activeComponentName(componentName);
        this.activeRoute = route;
    }
}

export = ContentLoaderViewModel;

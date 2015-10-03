import ko = require('knockout');

import Logger = require('../Logger');
import Events = require('../Events');
import Route = require("../models/Route")

class ContentLoaderViewModel {
    private static className = ContentLoaderViewModel.getName();
    private log: Logger;
    private activeRoute: Route;

    constructor() {
        this.log = new Logger(ContentLoaderViewModel.className);
        this.activeComponentName = ko.observable<string>();

        Events.subscribe(Events.routeUpdate, ContentLoaderViewModel.className,
            (data: {}) => {
                var route = Events.getRouteUpdateData(data);
                if (route) { this.updateContent(route); }
            });
    }

    public activeComponentName: KnockoutObservable<string>;

    public updateContent = (route: Route): void => {
        this.log.debug("Updating content view to '" + route.getComponentName() + "'");
        var componentName = route.getComponentName();
        this.activeComponentName(componentName);
        this.activeRoute = route;
    }
}

export = ContentLoaderViewModel;

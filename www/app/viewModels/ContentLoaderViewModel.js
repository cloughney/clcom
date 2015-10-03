define(["require", "exports", 'knockout', '../Logger', '../Events'], function (require, exports, ko, Logger, Events) {
    var ContentLoaderViewModel = (function () {
        function ContentLoaderViewModel() {
            var _this = this;
            this.updateContent = function (route) {
                _this.log.debug("Updating content view to '" + route.getComponentName() + "'");
                var componentName = route.getComponentName();
                _this.activeComponentName(componentName);
                _this.activeRoute = route;
            };
            this.log = new Logger(ContentLoaderViewModel.className);
            this.activeComponentName = ko.observable();
            Events.subscribe(Events.routeUpdate, ContentLoaderViewModel.className, function (data) {
                var route = Events.getRouteUpdateData(data);
                if (route) {
                    _this.updateContent(route);
                }
            });
        }
        ContentLoaderViewModel.className = ContentLoaderViewModel.getName();
        return ContentLoaderViewModel;
    })();
    return ContentLoaderViewModel;
});

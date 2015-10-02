define(["require", "exports", 'knockout', '../Logger', '../Events'], function (require, exports, ko, Logger, Events) {
    var ContentLoaderViewModel = (function () {
        function ContentLoaderViewModel() {
            var _this = this;
            this.updateContent = function (route) {
                if (route.equals(_this.activeRoute)) {
                    return;
                }
                _this.log.debug("Updating route to '" + route.getPath() + "'");
                var componentName = route.getComponentName();
                _this.activeComponentName(componentName);
                _this.activeRoute = route;
            };
            this.log = new Logger(ContentLoaderViewModel.getName());
            this.activeComponentName = ko.observable();
            Events.subscribe(Events.routeUpdate, "", function (data) {
                var route = Events.getRouteUpdateData(data);
                if (route) {
                    _this.updateContent(route);
                }
            });
        }
        ContentLoaderViewModel.className = "klochwork.viewModels.ContentLoaderViewModel";
        return ContentLoaderViewModel;
    })();
    return ContentLoaderViewModel;
});

define(["require", "exports", 'knockout', '../Router', './NavigationViewModel', './ContentLoaderViewModel'], function (require, exports, ko, Router, NavigationViewModel, ContentLoaderViewModel) {
    var ApplicationViewModel = (function () {
        function ApplicationViewModel(appConfig) {
            this.showLoadingOverlay = ko.observable(true);
            this.router = new Router(appConfig.routeConfig);
            this.navigation = new NavigationViewModel();
            this.contentLoader = new ContentLoaderViewModel();
            this.contentLoader.updateContent(this.router.activeRoute());
            this.showLoadingOverlay(false);
        }
        return ApplicationViewModel;
    })();
    return ApplicationViewModel;
});

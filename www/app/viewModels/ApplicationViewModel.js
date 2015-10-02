define(["require", "exports", '../Router', './NavigationViewModel', './ContentLoaderViewModel'], function (require, exports, Router, NavigationViewModel, ContentLoaderViewModel) {
    var ApplicationViewModel = (function () {
        function ApplicationViewModel(appConfig) {
            this.router = new Router(appConfig.routeConfig);
            this.navigation = new NavigationViewModel();
            this.contentLoader = new ContentLoaderViewModel();
            this.contentLoader.updateContent(this.router.activeRoute());
        }
        return ApplicationViewModel;
    })();
    return ApplicationViewModel;
});

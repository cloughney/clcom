define(["require", "exports", './NavigationViewModel'], function (require, exports, NavigationViewModel) {
    var ApplicationViewModel = (function () {
        function ApplicationViewModel(config) {
            this.config = config;
            this.navigation = new NavigationViewModel();
        }
        return ApplicationViewModel;
    })();
    return ApplicationViewModel;
});

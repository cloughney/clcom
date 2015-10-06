define(["require", "exports"], function (require, exports) {
    var NavigationViewModel = (function () {
        function NavigationViewModel() {
            this.items = [
                new NavigationItem("About", "#/about"),
                new NavigationItem("Resume", "#/resume"),
                new NavigationItem("404", "#/404")
            ];
        }
        return NavigationViewModel;
    })();
    var NavigationItem = (function () {
        function NavigationItem(title, path) {
            this.title = title;
            this.path = path;
        }
        return NavigationItem;
    })();
    return NavigationViewModel;
});

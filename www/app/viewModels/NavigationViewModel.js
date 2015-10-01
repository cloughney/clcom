define(["require", "exports"], function (require, exports) {
    var NavigationViewModel = (function () {
        function NavigationViewModel() {
            this.items = [
                new NavigationItem("Resume", "resume")
            ];
        }
        return NavigationViewModel;
    })();
    var NavigationItem = (function () {
        function NavigationItem(title, container) {
            this.title = title;
            this.container = container;
        }
        return NavigationItem;
    })();
    return NavigationViewModel;
});

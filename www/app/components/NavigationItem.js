define(["require", "exports"], function (require, exports) {
    var NavigationItem = (function () {
        function NavigationItem(text, path) {
            this.text = text;
            this.path = path;
        }
        return NavigationItem;
    })();
    return NavigationItem;
});

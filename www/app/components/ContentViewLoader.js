define(["require", "exports", 'knockout'], function (require, exports, ko) {
    var ViewLoader = (function () {
        function ViewLoader() {
        }
        return ViewLoader;
    })();
    ko.components.register("view-loader", {});
    return ViewLoader;
});

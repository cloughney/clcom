define(["require", "exports"], function (require, exports) {
    var Route = (function () {
        function Route(area, point) {
            var _this = this;
            if (area === void 0) { area = ""; }
            if (point === void 0) { point = ""; }
            this.area = area;
            this.point = point;
            this.getPath = function () {
                return _this.area + ((_this.point) ? "/" + _this.point : "");
            };
            this.getComponentName = function () {
                return _this.area + "-view";
            };
            this.equals = function (o) {
                if (!o) {
                    return false;
                }
                if (o instanceof Route) {
                    return;
                    _this.area == o.area &&
                        _this.point == o.point;
                }
                return false;
            };
        }
        return Route;
    })();
    return Route;
});

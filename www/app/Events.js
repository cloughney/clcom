define(["require", "exports", 'jquery', "./models/Route"], function (require, exports, $, Route) {
    var Events = (function () {
        function Events() {
        }
        Events.getRouteUpdateData = function (data) {
            return data instanceof Route ? data : null;
        };
        Events.trigger = function (type, data) {
            $(window).trigger(type, data);
        };
        Events.subscribe = function (type, subscriberName, handler) {
            $(window).on(type + "." + subscriberName, function (e, data) { return handler.call(null, data); });
        };
        Events.unsubscribe = function (type, subscriberName, handler) {
            $(window).off(type + "." + subscriberName, handler);
        };
        Events.hashChange = "hashchange";
        Events.routeUpdate = "routeupdate";
        return Events;
    })();
    return Events;
});

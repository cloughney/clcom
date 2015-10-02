import $ = require('jquery');
import Route = require("./models/Route");

class Events {
    public static hashChange: string = "hashchange";

    public static routeUpdate: string = "routeupdate";
    public static getRouteUpdateData(data: {}): Route {
        return data instanceof Route ? <Route>data : null;
    }



    public static trigger(type: string, data?: {}): void {
        $(window).trigger(type, data);
    }

    public static subscribe (type: string, subscriberName: string, handler: (data?: {}) => void): void {
        $(window).on(type + "." + subscriberName, (e: Event, data: {}) => handler.call(null, data));
    }

    public static unsubscribe (type: string, subscriberName: string, handler: (data?: {}) => void): void {
        $(window).off(type + "." + subscriberName, handler);
    }
}

export = Events;

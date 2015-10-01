'use strict';
requirejs.config({
    baseUrl: "app",
    paths: {
        "jquery": "https://code.jquery.com/jquery-2.1.4.min",
        "knockout": "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min"
    },
});
require(['jquery', 'knockout', './viewModels/ApplicationViewModel'], function ($, ko, ApplicationViewModel) {
    var appConfig = {
        debug: true
    };
    if (appConfig.debug === true) {
        console.log("Config loaded");
    }
    $(function () {
        var viewModel = new ApplicationViewModel(appConfig);
        ko.applyBindings(viewModel);
        if (appConfig.debug === true) {
            window["app"] = viewModel;
        }
    });
});

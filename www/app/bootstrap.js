'use strict';
requirejs.config({
    baseUrl: "./app",
    paths: {
        "text": "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
        "jquery": "//code.jquery.com/jquery-2.1.4.min",
        "knockout": "//cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min",
        "templates": "../templates"
    },
});
require(['./Extensions', './bindingHandlers/SlideVisible', './components/Registration'], function () { });
require(['jquery', 'knockout', './AppConfig', './viewModels/ApplicationViewModel'], function ($, ko, AppConfig, ApplicationViewModel) {
    $(function () {
        AppConfig.load().done(function (appConfig) {
            if (appConfig.debug) {
                console.log("Config loaded");
            }
            var viewModel = new ApplicationViewModel(appConfig);
            ko.applyBindings(viewModel);
            if (appConfig.debug) {
                window["app"] = viewModel;
                console.log("Bindings applied");
            }
        }).fail(function (msg) {
            throw msg;
        });
    });
});

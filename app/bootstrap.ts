'use strict';

requirejs.config({
	baseUrl: "./app",
	paths: {
		"text": "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
		"jquery": "//code.jquery.com/jquery-2.1.4.min",
		"knockout": "//cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min",

		"templates": "../templates"
	},

	// map: {
	// 	"*": { "jquery": "./lib/JQueryScoped" },
	// 	"./lib/JQueryScoped": { "jquery": "jquery" }
	// }
});

require(['./Extensions', './bindingHandlers/SlideVisible', './components/Registration'], () => {});

require(
	['jquery', 'knockout', './AppConfig', './viewModels/ApplicationViewModel'],
	($: JQueryStatic, ko: KnockoutStatic, AppConfig: any, ApplicationViewModel: any) => { //TODO type this
		$(() => {
			AppConfig.load().done((appConfig: any) => {
				if (appConfig.debug) {
					console.log("Config loaded");
				}

				var viewModel = new ApplicationViewModel(appConfig);
				ko.applyBindings(viewModel);

				if (appConfig.debug) {
					window["app"] = viewModel;
					console.log("Bindings applied");
				}
			}).fail((msg: string) => {
				throw msg;
			});
		});
});

'use strict';

requirejs.config({
	baseUrl: "app",
	paths: { //TODO remove protocol once testing moves to a web server
		"jquery": "https://code.jquery.com/jquery-2.1.4.min",
		"knockout": "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min"
	},

	// map: {
	// 	"*": { "jquery": "./lib/JQueryScoped" },
	// 	"./lib/JQueryScoped": { "jquery": "jquery" }
	// }
});

require(['jquery', 'knockout', './viewModels/ApplicationViewModel'], ($: JQueryStatic, ko: KnockoutStatic, ApplicationViewModel: any) => { //TODO type this
	var appConfig: AppConfig = {
		debug: true
	};

	if (appConfig.debug === true) {
		console.log("Config loaded");
	}

	$(() => {
		var viewModel = new ApplicationViewModel(appConfig);
		ko.applyBindings(viewModel);

		if (appConfig.debug === true) {
			window["app"] = viewModel;
		}
	});
});

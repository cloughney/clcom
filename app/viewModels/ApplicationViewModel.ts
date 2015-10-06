import ko = require('knockout');
import AppConfig = require('../AppConfig');
import Router = require('../Router');
import NavigationViewModel = require('./NavigationViewModel');
import ContentLoaderViewModel = require('./ContentLoaderViewModel');

class ApplicationViewModel {
    private router: Router;

    constructor(appConfig: AppConfig) {
        this.showLoadingOverlay = ko.observable(true);

        this.router = new Router(appConfig.routeConfig);
        this.navigation = new NavigationViewModel();
        this.contentLoader = new ContentLoaderViewModel();

        this.contentLoader.updateContent(this.router.activeRoute());

        this.showLoadingOverlay(false); //TODO fix page shift
    }

    public showLoadingOverlay: KnockoutObservable<boolean>;
    public navigation: NavigationViewModel;
    public contentLoader: ContentLoaderViewModel;
}

export = ApplicationViewModel;

import AppConfig = require('../AppConfig');
import Router = require('../Router');
import NavigationViewModel = require('./NavigationViewModel');
import ContentLoaderViewModel = require('./ContentLoaderViewModel');

class ApplicationViewModel {
    private router: Router;

    constructor(appConfig: AppConfig) {
        this.router = new Router(appConfig.routeConfig);

        this.navigation = new NavigationViewModel();
        this.contentLoader = new ContentLoaderViewModel();

        this.contentLoader.updateContent(this.router.activeRoute());
    }

    public navigation: NavigationViewModel;
    public contentLoader: ContentLoaderViewModel;
}

export = ApplicationViewModel;

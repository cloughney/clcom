import NavigationViewModel = require('./NavigationViewModel');

class ApplicationViewModel {
    constructor(private config: AppConfig) {
        this.navigation = new NavigationViewModel();
    }

    public navigation: NavigationViewModel;
}

export = ApplicationViewModel;

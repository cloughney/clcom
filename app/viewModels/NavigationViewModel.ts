class NavigationViewModel {
	constructor() {
		this.items = [
			new NavigationItem("About", "#/about"),
			new NavigationItem("Resume", "#/resume"),
			new NavigationItem("404", "#/404")
		];
	}

	public items: NavigationItem[];
}

class NavigationItem {
	constructor(
		public title: string,
		public path: string) {}
}

export = NavigationViewModel;

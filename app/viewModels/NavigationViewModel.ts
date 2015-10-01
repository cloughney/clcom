class NavigationViewModel {
	constructor() {
		this.items = [
			new NavigationItem("Resume", "resume")
		];
	}

	public items: NavigationItem[];
}

class NavigationItem {
	constructor(
		public title: string,
		public container: string) {}
}

export = NavigationViewModel;

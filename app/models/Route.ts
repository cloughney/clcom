class Route {
    constructor(
        public area: string = "",
        public point: string = "") {}

    public getPath = (): string => {
        return this.area + ((this.point) ? "/" + this.point : "");
    }

    public getComponentName = (): string => {
        return this.area + "-view";
    }

    public equals = (o: Object): boolean => {
        if (!o) { return false; }
        if (o instanceof Route) {
            return
                this.area == o.area &&
                this.point == o.point;
        }
        return false;
    }
}

export = Route;

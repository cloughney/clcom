interface RouteConfig {
    defaultRoute: string;
    notFoundRoute: string;
    routes: { [path: string]: string };
}

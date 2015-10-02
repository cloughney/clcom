define(["require", "exports", "knockout"], function (require, exports, ko) {
    ko.components.register("dashboard-view", {
        viewModel: { require: "./components/views/DashboardView" },
        template: { require: "text!templates/views/dashboard.html" }
    });
});

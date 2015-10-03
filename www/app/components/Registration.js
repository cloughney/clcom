define(["require", "exports", "knockout"], function (require, exports, ko) {
    ko.components.register("dashboard-view", {
        viewModel: { require: "./components/views/DashboardView" },
        template: { require: "text!templates/views/dashboard.html" }
    });
    ko.components.register("resume-view", {
        viewModel: { require: "./components/views/ResumeView" },
        template: { require: "text!templates/views/resume.html" }
    });
});

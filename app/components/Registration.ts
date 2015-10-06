import ko = require("knockout");

/* Views */

ko.components.register("about-view", {
    viewModel: { require: "./components/views/AboutView" },
    template: { require: "text!templates/views/about.html" }
});

ko.components.register("dashboard-view", {
    viewModel: { require: "./components/views/DashboardView" },
    template: { require: "text!templates/views/dashboard.html" }
});

ko.components.register("not-found-view", {
    viewModel: { require: "./components/views/NotFoundView" },
    template: { require: "text!templates/views/not-found.html" }
});

ko.components.register("resume-view", {
    viewModel: { require: "./components/views/ResumeView" },
    template: { require: "text!templates/views/resume.html" }
});

import ko = require("knockout");

/* Views */

ko.components.register("dashboard-view", {
    viewModel: { require: "./components/views/DashboardView" },
    template: { require: "text!templates/views/dashboard.html" }
});

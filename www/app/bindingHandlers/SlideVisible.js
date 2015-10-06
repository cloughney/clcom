define(["require", "exports", 'jquery', 'knockout'], function (require, exports, $, ko) {
    ko.bindingHandlers["slideVisible"] = {
        init: function (element, valueAccessor) {
            var isVisible = valueAccessor();
            $(element).toggle(ko.unwrap(isVisible));
        },
        update: function (element, valueAccessor) {
            var isVisible = valueAccessor();
            ko.unwrap(isVisible) ? $(element).slideDown() : $(element).slideUp();
        }
    };
});

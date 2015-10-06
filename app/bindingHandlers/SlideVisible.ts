import $ = require('jquery');
import ko = require('knockout');

ko.bindingHandlers["slideVisible"] = {
    init: (element: Element, valueAccessor: KnockoutObservable<any>) => {
        var isVisible = valueAccessor();
        $(element).toggle(ko.unwrap(isVisible));
    },
    update: (element: Element, valueAccessor: KnockoutObservable<any>) => {
        var isVisible = valueAccessor();
        ko.unwrap(isVisible) ? $(element).slideDown() : $(element).slideUp();
    }
};

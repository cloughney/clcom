define(["require", "exports", 'jquery'], function (require, exports, $) {
    function JQueryScoped() {
        return $.noConflict(true);
    }
    exports.JQueryScoped = JQueryScoped;
});

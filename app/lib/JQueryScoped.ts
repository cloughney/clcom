import $ = require('jquery');

export function JQueryScoped() {
    return $.noConflict(true);
}

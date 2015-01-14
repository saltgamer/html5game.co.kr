
define(function () {
	'use strict';
    return function log (logdata) {
        var console = window.console || { log : function () {} };
		console.log(logdata);
    };
});

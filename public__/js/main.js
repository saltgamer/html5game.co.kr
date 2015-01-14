'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: [
                'jquery'
            ],
            exports: 'bootstrap'
        }
    },
    paths: {
        jquery: 'libs/jquery',
        bootstrap: 'libs/bootstrap.min',
        detector: 'libs/Detector',
        three: 'libs/three.min',
        stats: 'libs/stats.min'
    }
});

require([
    'jquery',
    'bootstrap',
    'detector',
    'three',
    'bgSpace',
    'stats',
    'log',
    'version'
], function (jquery, bootstrap, detector, three, bgSpace, stats, log, Version) {

    log("\n\n" + Version.getInfo() +  "\n\n");

    var userinterfaceInit = function () {
        $(".navbar-brand img").hover(
            function () { $(this).attr("src", "../images/html5game_logo_over.png"); },
            function () { $(this).attr("src", "../images/html5game_logo.png"); }
        );
    };
    
    $(document).ready(function () {
        userinterfaceInit();

        if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
        var backgroundSpace = new bgSpace();
            backgroundSpace.init();
            backgroundSpace.animate();
            

    });
    
});

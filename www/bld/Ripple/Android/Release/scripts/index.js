﻿(function () {
    "use strict";

    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    document.addEventListener("deviceready", onReady, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("pause", onPause, false);

    function onReady() {
        // Handle the deviceready event.
        initialize();
    }

    function onResume() {
        // Handle the resume event
    }

    function onPause() {
        // Handle the pause event
    }

    function initialize() {

        nav.history = app.sessionState.history || {};
        nav.history.current.initialPlaceholder = true;

        // Optimize the load of the application and while the splash screen is shown, execute high priority scheduled work.
        ui.disableAnimations();
        var p = ui.processAll().then(function () {
            return nav.navigate(nav.location || Application.navigator.home, nav.state);
        }).then(function () {
            return sched.requestDrain(sched.Priority.aboveNormal + 1);
        }).then(function () {
            ui.enableAnimations();
        });

        // ui.processAll();
    }

})();
"use strict";
apingApp.config(['$provide', function ($provide) {

    $provide.constant("apingApiKeys", {});

    $provide.constant("apingDefaultSettings", {
        templateUrl : "aping_design_blanko.html",
        items : 20, //items per request
        maxItems: 100, //max items per aping
        orderBy : "timestamp",
        orderReverse : "true",
        model: "social",
        getNativeData: false,
        removeDoubles: false,
    });

}]);
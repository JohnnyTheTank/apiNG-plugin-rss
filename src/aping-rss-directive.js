"use strict";

var jjtApingRss = angular.module("jtt_aping_rss", [])
    .directive('apingRss', ['apingRssHelper', 'apingUtilityHelper', 'rssFactory', function (apingRssHelper, apingUtilityHelper, rssFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingRss, apingRssHelper.getThisPlatformString(), appSettings);

                requests.forEach(function (request) {

                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                    };
                    if(typeof appSettings.getNativeData !== "undefined") {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    if(request.parseImage === "true" || request.parseImage === true) {
                        helperObject.parseImage = true;
                    }

                    //create requestObject for api request call
                    var requestObject = {
                        v:"1.0",
                        callback: "JSON_CALLBACK",
                    };

                    if(typeof request.items !== "undefined") {
                        requestObject.num = request.items;
                    } else {
                        requestObject.num = appSettings.items;
                    }

                    if(requestObject.num == 0) {
                        return false;
                    }

                    if(request.path) {
                        requestObject.q = request.path;
                    }

                    // -1 is "no explicit limit". same for NaN value
                    if(requestObject.num < 0 || isNaN(requestObject.num)) {
                        requestObject.num = undefined;
                    }

                    //get _data for each request
                    rssFactory.getData(requestObject)
                        .then(function (_data) {
                            if (_data) {
                                apingController.concatToResults(apingRssHelper.getObjectByJsonData(_data, helperObject));
                            }
                        });
                });
            }
        }
    }]);
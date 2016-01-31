"use strict";

angular.module("jtt_aping_rss", [])
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

                    if (angular.isDefined(appSettings.getNativeData)) {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    if (request.parseImage === "false" || request.parseImage === false) {
                        helperObject.parseImage = false;
                    } else {
                        helperObject.parseImage = true;
                    }

                    //create requestObject for api request call
                    var requestObject = {
                        v: "1.0",
                        callback: "JSON_CALLBACK",
                    };

                    if (angular.isDefined(request.items)) {
                        requestObject.num = request.items;
                    } else {
                        requestObject.num = appSettings.items;
                    }

                    if (requestObject.num === 0 || requestObject.num === '0') {
                        return false;
                    }

                    if (request.path) {
                        requestObject.q = request.path;
                    }

                    if (request.protocol === "http" || request.protocol === "https") {
                        requestObject.protocol = request.protocol + "://";
                    } else {
                        requestObject.protocol = "//";
                    }

                    // -1 is "no explicit limit". same for NaN value
                    if (requestObject.num < 0 || isNaN(requestObject.num)) {
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
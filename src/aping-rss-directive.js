"use strict";

angular.module("jtt_aping_rss", [])
    .directive('apingRss', ['apingRssHelper', 'apingUtilityHelper', 'jsonloaderFactory', function (apingRssHelper, apingUtilityHelper, jsonloaderFactory) {
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
                    var requestObject = {};

                    if (angular.isDefined(request.items)) {
                        helperObject.items = request.items;
                    } else {
                        helperObject.items = appSettings.items;
                    }

                    if (helperObject.items === 0 || helperObject.items === '0') {
                        return false;
                    }

                    if (request.protocol === "http" || request.protocol === "https") {
                        requestObject.protocol = request.protocol + "://";
                    } else if (appSettings.protocol === "http" || appSettings.protocol === "https") {
                        requestObject.protocol = appSettings.protocol + "://";
                    } else {
                        requestObject.protocol = "//";
                    }

                    if (request.path) {
                        requestObject.path = requestObject.protocol + 'api.rss2json.com/v1/api.json?rss_url=' + request.path
                    }

                    // -1 is "no explicit limit". same for NaN value
                    if (requestObject.num < 0 || isNaN(requestObject.num)) {
                        requestObject.num = undefined;
                    }

                    jsonloaderFactory.getJsonData(requestObject)
                        .then(function (_data) {
                            if (_data) {
                                apingController.concatToResults(apingRssHelper.getObjectByJsonData(_data, helperObject));
                            }
                        });
                });
            }
        }
    }]);
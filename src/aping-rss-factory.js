"use strict";

jjtApingRss.factory('rssFactory', ['$http', function ($http) {
    var rssFactory = {};
    rssFactory.getData = function (_requestObject) {
        return $http.jsonp(
            '//ajax.googleapis.com/ajax/services/feed/load',
            {
                method: 'GET',
                params: _requestObject
            }
        );
    };
    return rssFactory;
}]);
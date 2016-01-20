"use strict";

jjtApingRss.factory('rssFactory', ['$http', function ($http) {
    var rssFactory = {};
    rssFactory.getData = function (_requestObject) {

        var url = _requestObject.protocol + 'ajax.googleapis.com/ajax/services/feed/load';
        _requestObject.protocol = undefined;

        return $http.jsonp(
            url,
            {
                method: 'GET',
                params: _requestObject
            }
        );
    };
    return rssFactory;
}]);
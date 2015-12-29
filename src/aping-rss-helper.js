"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-rss
 @licence MIT
 */

jjtApingRss.service('apingRssHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
    this.getThisPlattformString = function () {
        return "rss";
    };

    this.getObjectByJsonData = function (_data, _helperObject) {
        var requestResults = [];
        if (_data && _data.responseData) {
            if (_data.responseData.feed && _data.responseData.feed.entries) {

                var _this = this;

                angular.forEach(_data.responseData.feed.entries, function (value, key) {
                    var tempResult;
                    if(_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                        tempResult = value;
                    } else {

                        value.blog_link = _data.responseData.feed.link || _data.responseData.feed.feedUrl || undefined;
                        value.blog_author = _data.responseData.feed.author || _data.responseData.feed.title || undefined;

                        tempResult = _this.getItemByJsonData(value, _helperObject.model);
                    }
                    if(tempResult) {
                        requestResults.push(tempResult);
                    }
                });
            }

        }
        return requestResults;
    };

    this.getItemByJsonData = function (_item, _model) {
        var returnObject = {};
        if (_item && _model) {
            switch (_model) {
                case "social":
                    returnObject = this.getSocialItemByJsonData(_item);
                    break;

                case "native":
                    returnObject = _item;
                    break;

                default:
                    return false;
            }
        }
        return returnObject;
    };

    this.getSocialItemByJsonData = function (_item) {
        var socialObject = apingModels.getNew("social", this.getThisPlattformString());

        //fill _item in socialObject
        $.extend(true, socialObject, {
            blog_name: _item.blog_author || undefined,
            blog_link: _item.blog_link || undefined,
            post_url: _item.link || undefined,
            source: (_item.categories && _item.categories.length > 0) ? _item.categories : undefined
        });

        if(_item.content) {
            socialObject.text = apingUtilityHelper.getTextFromHtml(_item.content);
            socialObject.caption = _item.title || undefined;
        } else {
            socialObject.text = _item.title || undefined;
        }


        socialObject.date_time = _item.publishedDate ? new Date(_item.publishedDate) : undefined;
        socialObject.timestamp = socialObject.date_time ? socialObject.date_time.getTime() : undefined;

        return socialObject;
    };

}]);
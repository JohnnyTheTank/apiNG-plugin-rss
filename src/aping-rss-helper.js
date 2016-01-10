"use strict";

jjtApingRss.service('apingRssHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
    this.getThisPlatformString = function () {
        return "rss";
    };

    this.getObjectByJsonData = function (_data, _helperObject) {
        var requestResults = [];
        if (_data && _data.data && _data.data.responseData) {
            if (_data.data.responseData.feed && _data.data.responseData.feed.entries) {

                var _this = this;

                angular.forEach(_data.data.responseData.feed.entries, function (value, key) {
                    var tempResult;
                    if (_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                        tempResult = value;
                    } else {

                        value.blog_link = _data.data.responseData.feed.link || _data.data.responseData.feed.feedUrl || undefined;
                        value.blog_author = _data.data.responseData.feed.author || _data.data.responseData.feed.title || undefined;

                        tempResult = _this.getItemByJsonData(value, _helperObject);
                    }
                    if (tempResult) {
                        requestResults.push(tempResult);
                    }
                });
            }

        }
        return requestResults;
    };

    this.getItemByJsonData = function (_item, _helperObject) {
        var returnObject = {};
        if (_item && _helperObject.model) {
            switch (_helperObject.model) {
                case "social":
                    returnObject = this.getSocialItemByJsonData(_item, _helperObject);
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

    this.getSocialItemByJsonData = function (_item, _helperObject) {
        var socialObject = apingModels.getNew("social", this.getThisPlatformString());

        //fill _item in socialObject
        $.extend(true, socialObject, {
            blog_name: _item.blog_author || undefined,
            blog_link: _item.blog_link || undefined,
            post_url: _item.link || undefined,
            source: (_item.categories && _item.categories.length > 0) ? _item.categories : undefined
        });

        if (_item.content) {
            socialObject.text = apingUtilityHelper.getTextFromHtml(_item.content);
            socialObject.caption = _item.title || undefined;
        } else {
            socialObject.text = _item.title || undefined;
        }

        if (_item.content && _helperObject.parseImage) {
            var imagesArray = apingUtilityHelper.getFirstImageFromHtml(_item.content);
            if (imagesArray && imagesArray.length > 1) {
                socialObject.img_url = imagesArray[1];
            }
        }

        socialObject.date_time = _item.publishedDate ? new Date(_item.publishedDate) : undefined;
        socialObject.timestamp = socialObject.date_time ? socialObject.date_time.getTime() : undefined;

        return socialObject;
    };

}]);
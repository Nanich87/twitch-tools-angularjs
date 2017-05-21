(function () {
    'use strict';

    function downloadService(data, twitchApiBaseUrl, clientId) {

        function getVideoLink(video) {
            var videoType = video.substring(0, 1);
            var request = videoType === 'v'
                ? 'api/vods/' + video.substring(1) + '/access_token?as3=t'
                : 'api/videos/' + video;

            return data.jsonp(twitchApiBaseUrl + request + '&client_id=' + clientId, { dataType: 'jsonp', contentType: 'application/json' });
        }

        return {
            getVideoLink: getVideoLink
        }
    }

    angular.module('twitchTools.services')
        .factory('download', ['data', 'twitchApiBaseUrl', 'clientId', downloadService])
}());
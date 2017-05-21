(function () {
    'use strict';

    function streamService(data, twitchApiBaseUrl, clientId) {

        var streamsRequestUrl = 'kraken/streams/';

        function getFeaturedStreams(limit) {
            return data.get(twitchApiBaseUrl + streamsRequestUrl + 'featured', { limit: limit, client_id: clientId });
        }

        function getSummary(game) {
            return data.get(twitchApiBaseUrl + streamsRequestUrl + 'summary', { game: game, client_id: clientId });
        }

        function getStream(channel) {
            return data.get(twitchApiBaseUrl + streamsRequestUrl + channel, { client_id: clientId });
        }

        return {
            getFeaturedStreams: getFeaturedStreams,
            getSummary: getSummary,
            getStream: getStream
        }
    }

    angular.module('twitchTools.services')
        .factory('streams', ['data', 'twitchApiBaseUrl', 'clientId', streamService])
}());
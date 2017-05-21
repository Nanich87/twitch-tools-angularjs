(function () {
    'use strict';

    function PlayController($routeParams, $rootScope, channel) {
        var vm = this;

        vm.video = {
            title: null,
            status: null,
            id: null
        }

        channel.getVideoDetails($routeParams.video)
            .then(function getResponse(data) {
                vm.video.title = data.title;

                var player = new Twitch.Player('twitch-player', {
                    width: 640,
                    height: 400,
                    video: $routeParams.video,
                });
                player.setVolume(0.5);

                $rootScope.title = 'Play: ' + data.title;

                vm.video.status = 'found';
            }, function getError(error) {
                vm.video.status = 'not found';
            });
    }

    angular.module('twitchTools.controllers')
        .controller('PlayController', ['$routeParams', '$rootScope', 'channel', PlayController]);
}());
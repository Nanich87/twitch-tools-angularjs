(function () {
    'use strict';

    function LiveController($routeParams, $rootScope, streams) {
        var vm = this;

        vm.channel = {
            name: null,
            status: null
        }

        streams.getStream($routeParams.channel)
            .then(function getResponse(data) {
                if (data.stream != null) {
                    vm.title = data.stream.channel.display_name + ' is playing ' + data.stream.game;
                    vm.channel.name = data.stream.channel.name;

                    $rootScope.title = 'Live: ' + data.stream.channel.display_name;

                    var player = new Twitch.Player('twitch-player', {
                        width: 640,
                        height: 400,
                        channel: data.stream.channel.name,
                    });
                    player.setVolume(0.5);

                    vm.channel.status = 'online';
                } else {
                    vm.channel.status = 'offline';
                }
            }, function getError(error) {
                vm.channel.status = 'error';
            });
    }

    angular.module('twitchTools.controllers')
        .controller('LiveController', ['$routeParams', '$rootScope', 'streams', LiveController]);
}());
/**
 * Created by like on 16/12/14.
 */
var app = angular.module('app', ['ui.bootstrap', 'ngResource'])
    .config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://localhost:9000/**'
        ]);
    });
var baseAddress = 'http://localhost:9000/';
var url = "";

app.factory('cameraFactory', function ($http) {

    return {
        getcamerasList: function () {
            url = baseAddress + "listCamera";
            return $http.get(url);
        },
        getcamera: function (camera) {
            url = baseAddress + "listCamera" + camera.id;
            return $http.get(url);
        },
        addcamera: function (camera) {
            url = baseAddress + "addCamera";
            return $http.post(url, camera);
        },
        deletecamera: function (camera) {
            url = baseAddress + "deleteCamera/" + camera.id;
            //return $http.delete(url);
            return $http.get(url);
        },
        updatecamera: function (camera) {
            url = baseAddress + "Modifycamera";
            // return $http.put(url, camera);
            return $http.post(url, camera);
        }
    };
});


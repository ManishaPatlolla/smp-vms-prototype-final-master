/**************************
 Initialize the Angular App
 **************************/

var app = angular.module("app", [
    "ngRoute",
    "ngAnimate",
    "ui.bootstrap",
    "app.ui.ctrls",
    "app.controllers",
    "app.directives",
    "smpvmsServices",
    "smart-table"
   ]).run(["$rootScope", "$location",
    function ($rootScope, $location) {

        $(window).load(function () {

            setTimeout(function () {
                $('.page-loading-overlay').addClass("loaded");
                $('.load_circle_wrapper').addClass("loaded");
            }, 1000);

        });

    }]).config(["$routeProvider",
    function ($routeProvider) {
        return $routeProvider.when("/", {
            redirectTo: "/dashboard"
        }).when("/dashboard", {
            templateUrl: "app/views/dashboards/dashboard.html"
        })
            .when("/manageUser/userGroup", {
                templateUrl: "app/views/manageUser/userGroup.html"
            })
            .when("/camera/cameraSetting", {
                templateUrl: "app/views/camera/cameraSetting.html"
            }).
            when("/camera/cameraCluster", {
                templateUrl: "app/views/camera/cameraCluster.html"
            }).
            when("/camera/cameraAccessProfile", {
                templateUrl: "app/views/camera/cameraAccessProfile.html"
            }).
            when("/404", {
                templateUrl: "app/views/pages/404.html"
            }).otherwise({
                redirectTo: "/404"
            });
    }
]);


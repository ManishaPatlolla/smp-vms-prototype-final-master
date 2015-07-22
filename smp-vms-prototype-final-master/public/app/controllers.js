/*
 Application controllers
 Main controllers for the app
 */

 var controlGlobal = angular.module("app.controllers", []).controller("AdminAppCtrl", ["$scope", "$location",
        function($scope, $location) {
            $scope.checkIfOwnPage = function() {

                return _.contains(["/404", "/pages/500", "/pages/login", "/pages/signin", "/pages/signin1", "/pages/signin2", "/pages/signup", "/pages/signup1", "/pages/signup2", "/pages/forgot", "/pages/lock-screen"], $location.path());

            };

            $scope.info = {
                theme_name: "SMP",
                user_name: "admin"
            };


        }
    ]).controller("NavCtrl", ["$scope",
        function($scope) {

            $scope.eventInfo = {
                event_number: 2
            };

        }
    ]).controller("DashboardCtrl", ["$scope",
        function($scope) {


        }
    ])
    .controller('cameraController', function ($scope) {
    $scope.cameras = [];
    $scope.camera = null;
    $scope.editMode = false;

    //get camera
    $scope.get = function () {
        $scope.camera = this.camera;
        $('#viewModal').modal('show');
    };

    //get all cameras
    $scope.getAll = function () {
        //cameraFactory.getcamerasList().success(function (data, status) {
        //    $scope.cameras = data;
        //
        //    $scope.totalItems = $scope.cameras.length;
        //    $scope.currentPage = 1;
        //    $scope.numPerPage = 5;
        //
        //    $scope.paginate = function (value) {
        //        var begin, end, index;
        //        begin = ($scope.currentPage - 1) * $scope.numPerPage;
        //        end = begin + $scope.numPerPage;
        //        index = $scope.cameras.indexOf(value);
        //        return (begin <= index && index < end);
        //    };
        //}).error(function (data) {
        //    $scope.error = "An Error has occurred while Loading cameras! " + data.ExceptionMessage;
        //});
    };

    // add camera
    $scope.add = function () {
        //var currentcamera = $scope.camera;
        //if (currentcamera != null && currentcamera.nodes != null && currentcamera.name && currentcamera.location && currentcamera.groupname) {
        //    cameraFactory.addcamera(currentcamera).success(function (data) {
        //        $scope.addMode = false;
        //        currentcamera.cameraId = data;
        //        $scope.cameras.push(currentcamera);
        //
        //        //reset form
        //        $scope.camera = null;
        //        $('#cameraModel').modal('hide');
        //        $scope.getAll();
        //    }).error(function (data) {
        //        $scope.error = "An Error has occurred while Adding camera! " + data.ExceptionMessage;
        //    });
        //}
    };

    //edit camera
    $scope.edit = function () {
        $scope.camera = this.camera;
        $scope.editMode = true;
        $('#cameraModel').modal('show');
    };

    //update camera
    $scope.update = function () {
        //var currentcamera = this.camera;
        //cameraFactory.updatecamera(currentcamera).success(function (data) {
        //    currentcamera.editMode = false;
        //    $('#cameraModel').modal('hide');
        //}).error(function (data) {
        //    $scope.error = "An Error has occurred while Updating camera! " + data.ExceptionMessage;
        //});
    };

    // delete camera
    $scope.delete = function () {
        //currentcamera = $scope.camera;
        //cameraFactory.deletecamera(currentcamera).success(function (data) {
        //    $('#confirmModal').modal('hide');
        //    $scope.cameras.pop(currentcamera);
        //    $scope.getAll();
        //}).error(function (data) {
        //    $scope.error = "An Error has occurred while Deleting camera! " + data.ExceptionMessage;
        //    $('#confirmModal').modal('hide');
        //});
    };


//Model popup events
    $scope.showadd = function () {
        $scope.camera = null;
        $scope.editMode = false;
        $('#cameraModel').modal('show');
    };

    $scope.showedit = function () {
        $('#cameraModel').modal('show');
    };

    $scope.showconfirm = function (data) {
        $scope.camera = data;
        $('#confirmModal').modal('show');
    };

    $scope.cancel = function () {
        $scope.camera = null;
        $('#cameraModel').modal('hide');
    };

    // initialize your cameras data
    $scope.getAll();


})
;

/*
 App Ui Controllers
 Provides general controllers for the app
 */

angular.module("app.ui.ctrls", []).controller("NotifyCtrl", ["$scope", "loggit",
    function($scope, loggit) {
        $scope.notify = function(type) {
            switch (type) {
                case "info":
                    return loggit.log("Hello! This is an alert of the info importance level.");
                case "success":
                    return loggit.logSuccess("Great! You did something successfully.");
                case "warning":
                    return loggit.logWarning("Warning! Something that happened that is not critical but important.");
                case "error":
                    return loggit.logError("Error! Something went terribly wrong and needs your attention.");
            }
        };
    }
]).controller("AlertDemoCtrl", ["$scope",
    function($scope) {
        $scope.alerts = [{
            type: "success",
            msg: "Great! You did something successfully."
        }, {
            type: "info",
            msg: "Hello! This is an alert of the info importance level."
        }, {
            type: "warning",
            msg: "Warning! Something that happened that is not critical but important."
        }, {
            type: "danger",
            msg: "Error! Something went terribly wrong and needs your attention."
        }];

        $scope.addAlert = function() {
            $scope.alerts.push({msg: 'Another alert!'});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }
]).controller("ProgressDemoCtrl", ["$scope",
    function($scope) {
        $scope.max = 200;

        $scope.random = function() {
            var value = Math.floor((Math.random() * 100) + 1);
            var type;

            if (value < 25) {
                type = 'success';
            } else if (value < 50) {
                type = 'info';
            } else if (value < 75) {
                type = 'warning';
            } else {
                type = 'danger';
            }

            $scope.showWarning = (type === 'danger' || type === 'warning');

            $scope.dynamic = value;
            $scope.type = type;
        };
        $scope.random();

        $scope.randomStacked = function() {
            $scope.stacked = [];
            var types = ['success', 'info', 'warning', 'danger'];

            for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
                var index = Math.floor((Math.random() * 4));
                $scope.stacked.push({
                    value: Math.floor((Math.random() * 30) + 1),
                    type: types[index]
                });
            }
        };
        $scope.randomStacked();
    }
]).controller("AccordionDemoCtrl", ["$scope",
    function($scope) {
        return $scope.oneAtATime = !0, $scope.groups = [{
            title: "First Group Header",
            content: "First Group Body"
        }, {
            title: "Second Group Header",
            content: "Second Group Body"
        }, {
            title: "Third Group Header",
            content: "Third Group Body"
        }], $scope.items = ["Item 1", "Item 2", "Item 3"], $scope.status = {
            isFirstOpen: !0,
            isFirstOpen1: !0,
            isFirstOpen2: !0,
            isFirstOpen3: !0,
            isFirstOpen4: !0,
            isFirstOpen5: !0,
            isFirstOpen6: !0
        }, $scope.addItem = function() {
            var newItemNo;
            newItemNo = $scope.items.length + 1;
            $scope.items.push("Item " + newItemNo);
        };
    }
]).controller("CollapseDemoCtrl", ["$scope",
    function($scope) {
        $scope.isCollapsed = !1;
    }
]).controller("ModalDemoCtrl", ["$scope", "$modal", "$log",
    function($scope, $modal, $log) {
        $scope.items = ['item1', 'item2', 'item3'];

        $scope.open = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
]).controller("ModalInstanceCtrl", ["$scope", "$modalInstance", "items",
    function($scope, $modalInstance, items) {
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
]).controller("PaginationDemoCtrl", ["$scope",
    function($scope) {
        $scope.totalItems = 64;
        $scope.currentPage = 4;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
    }
]).controller("MapDemoCtrl", ["$scope", "$http", "$interval",
    function($scope, $http, $interval) {
        var i, markers;
        for (markers = [], i = 0; 8 > i;){
            markers[i] = new google.maps.Marker({
                title: "Marker: " + i
            });
            i++;
        }
        $scope.GenerateMapMarkers = function() {
            var d, lat, lng, loc, numMarkers;
            for (d = new Date(), $scope.date = d.toLocaleString(), numMarkers = Math.floor(4 * Math.random()) + 4, i = 0; numMarkers > i;){
                lat = 38.73 + Math.random() / 100;
                lng = -9.14 + Math.random() / 100;
                loc = new google.maps.LatLng(lat, lng);
                markers[i].setPosition(loc);
                markers[i].setMap($scope.map);
                i++;
            }
        }; $interval($scope.GenerateMapMarkers, 2e3);
    }
]).controller("TreeDemoCtrl", ["$scope",
    function($scope) {
        // Parameters

        $scope.list = [{
            "id": 1,
            "title": "1. dragon-breath",
            "items": []
        }, {
            "id": 2,
            "title": "2. moiré-vision",
            "items": [{
                "id": 21,
                "title": "2.1. tofu-animation",
                "items": [{
                    "id": 211,
                    "title": "2.1.1. spooky-giraffe",
                    "items": []
                }, {
                    "id": 212,
                    "title": "2.1.2. bubble-burst",
                    "items": []
                }]
            }, {
                "id": 22,
                "title": "2.2. barehand-atomsplitting",
                "items": []
            }]
        }, {
            "id": 3,
            "title": "3. unicorn-zapper",
            "items": []
        }, {
            "id": 4,
            "title": "4. romantic-transclusion",
            "items": []
        }];

        $scope.callbacks = {
        };

        $scope.remove = function(scope) {
            scope.remove();
        };

        $scope.toggle = function(scope) {
            scope.toggle();
        };

        $scope.newSubItem = function(scope) {
            var nodeData = scope.$modelValue;
            nodeData.items.push({
                id: nodeData.id * 10 + nodeData.items.length,
                title: nodeData.title + '.' + (nodeData.items.length + 1),
                items: []
            });
        };
    }
]);


/**
 * Created by like on 17/12/14.
 */

controlGlobal.service('cameraClusterTable', function () {
    var cameraClusters = [{}];
    var currentPageCluters = [];
    return {
        cameraClusters: cameraClusters,
        currentPage: currentPageCluters
    };
})
controlGlobal.controller("tableCtrl", ["$scope", "$filter", "$modal", "$log", 'cameraClusterService', 'cameraClusterTable',
    function ($scope, $filter, $modal, $log, cameraClusterService, cameraClusterTable) {
        var init;
        $scope.clusters = cameraClusterTable.cameraClusters;
        $scope.searchKeywords = "";
        $scope.filteredclusters = [];
        $scope.row = "";
        $scope.select = function (page) {
            var end, start;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            $scope.currentPageclusters.length = 0;
            $scope.updateFilteredClusters();
            var filtered = $scope.filteredclusters.slice(start, end);
            for (var i = 0; i < filtered.length; i++) {
                $scope.currentPageclusters.push(filtered[i]);
            }
        };

        $scope.onFilterChange = function () {
            $scope.select(1);
            $scope.currentPage = 1;
            $scope.row = "";
        };
        $scope.onNumPerPageChange = function () {
            $scope.select(1);
            $scope.currentPage = 1;
        };
        $scope.onOrderChange = function () {
            $scope.select(1);
            $scope.currentPage = 1;
        };
        $scope.updateFilteredClusters = function () {
            $scope.filteredclusters = $filter("filter")($scope.clusters, $scope.searchKeywords);
        }
        $scope.search = function () {
            $scope.updateFilteredClusters();
            $scope.onFilterChange();
        };
        $scope.order = function (rowName) {
            if ($scope.row !== rowName) {
                $scope.row = rowName;
                $scope.filteredclusters = $filter("orderBy")($scope.clusters, rowName);
                $scope.onOrderChange();
            } else {
                void 0;
            }
        };
        $scope.numPerPageOpt = [3, 5, 10, 20];
        $scope.numPerPage = $scope.numPerPageOpt[2];
        $scope.currentPage = 1;
        $scope.currentPageclusters = cameraClusterTable.currentPage;
        $scope.updateTablemy = function () {
            //cameraClusterService.query(function(data){
            //
            //    $scope.clusters.length = 0;
            //    for(var i = 0 ; i < data.length;i++){
            //       $scope.clusters.push(data[i]);
            //    }
            cameraClusterService.get({size: 6, page: 0}, function (data) {
                $scope.clusters.length = 0;
                for (var i = 0; i < data.length; i++) {
                    $scope.clusters.push(data[i]);
                }
                $log.info(data);
                init();
                $log.info(cameraClusterTable);
                $log.info($scope.currentPageclusters);
            });
        }
        (init = function () {
            $scope.search();
            $scope.select($scope.currentPage);
        });

    }
])

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
    .
    controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'cameraClusterService', function ($scope, $modalInstance, ccs) {
        $scope.cameraCluster = new ccs();
        $scope.ok = function () {
            $modalInstance.close($scope.cameraCluster);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }])
    .controller('cameraClusterControler', ["$scope", "$filter", "$modal", "$log", 'cameraClusterService', 'cameraClusterTable',
        function ($scope, $filter, $modal, $log, cameraCluster, cameraClusterTable) {
            $scope.open = function (size) {
                var modalInstance = $modal.open({
                    templateUrl: 'app/views/camera/modaltest.html',
                    controller: 'ModalInstanceCtrl',
                    size: size

                });
                modalInstance.result.then(function (cameraCluster) {
                    cameraCluster.$save(function (data, status) {
                        cameraClusterTable.cameraClusters.push(data);
                        cameraClusterTable.currentPage.unshift(data);
                        $log.info('data' + data);
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        }])

;
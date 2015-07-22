
/**************************
 App ui Services

 loggit - Creates a logit type message for all logging

 **************************/
//
var smpvmsServices = angular.module('smpvmsServices', ['ngResource']);

smpvmsServices.factory('cameraClusterService', ['$resource',
    function ($resource) {
        var src = $resource('api/cameraCluster/:size/:page',
            {size: "@size", page: "@page"}, //parameters default
            {
                get: { method: "GET", params: {size:1 , page: 1},isArray:true},
                save:{method:"POST"}
                //GetTodo: { method: "GET", params: { id: 0 } },
                //CreateTodo: { method: "POST", params: { content: "", order: 0, done: false } },
                //UpdateTodo: { method: "PATCH", params: { /*...*/ } },
                //DeleteTodo: { method: "DELETE", params: { id: 0 } },
                //ResetTodos: { method: "GET", params: { cmd: "reset" } },
            });
        return src;
        //return $resource('/api/cameraCluster/:size/:page',{size:123, page:'@id'},{
        //    query: {method: 'GET', params: {id: 'cameras'}, isArray: true}
        //});
    }]);
        //return toastr.options = {
        //    closeButton: !0,
        //    positionClass: "toast-top-right",
        //    timeOut: "3000"
        //}, logIt = function(message, type) {
        //    return toastr[type](message);
        //}, {
        //    log: function(message) {
        //        logIt(message, "info");
        //    },
        //    logWarning: function(message) {
        //        logIt(message, "warning");
        //    },
        //    logSuccess: function(message) {
        //        logIt(message, "success");
        //    },
        //    logError: function(message) {
        //        logIt(message, "error");
//        //    }
//        //};
//    }
//]);


(function () {
    "use strict";

    angular
        .module("AngularMDApp")
        .factory('StandUpEntryService', StandUpEntryService);

    StandUpEntryService.$inject = ['$http', '$q', '$log'];

    function StandUpEntryService($http, $q, $log) {
        return {
            createStandUpEntry: createStandUpEntry,
            getAllEntries: getAllEntries
        };

        function createStandUpEntry(entries) {
            var deferred = $q.defer();
            $http.post("/api/v1/entry/" + entries[0].email, entries)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
            return deferred.promise;
        }

        function getAllEntries() {
            var deferred = $q.defer();
            $http.get("/api/v1/entry")
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });

            return deferred.promise;
        }
    }

})();
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
            return $http.post("/api/v1/entry/" + entries[0].email, entries).then(successResponse).catch(errorResponse);
        }

        function getAllEntries() {
            return $http.get("/api/v1/entry").then(successResponse).catch(errorResponse);
        }

        function successResponse(response) {
            return response.data;
        }

        function errorResponse (error) {
            return new Error(error);
        }

    }

})();
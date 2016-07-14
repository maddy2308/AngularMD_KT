(function() {
    "use strict";

    angular
        .module("AngularMDApp")
        .controller('CreateEntryController', CreateEntryController);

    CreateEntryController.$inject = [];

    function CreateEntryController() {
        var vm = this;

        vm.submitEntry = submitEntry;

        function submitEntry () {
            alert("Submit clicked");
        }
    }

})();
(function() {
    "use strict";

    angular
        .module("AngularMDApp")
        .controller('CreateEntryController', CreateEntryController);

    CreateEntryController.$inject = [];

    function CreateEntryController() {
        var vm = this;

        vm.submitEntry = submitEntry;
        vm.addForm = addForm;
        vm.removeForm = removeForm;

        vm.entries = [];

        function submitEntry () {
            alert("Submit clicked");
        }

        function addForm() {
            var entryObject = {
                'date' : vm.entry.date,
                'plan' : vm.entry.plan
            };
            vm.entries.push(entryObject);
            vm.entry.plan = '';
        }

        function removeForm(index) {
            if (index >= 0) {
                vm.entries.splice(index, 1);
            }
        }
    }

})();
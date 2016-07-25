(function() {
    "use strict";

    angular
        .module("AngularMDApp")
        .controller('StandUpEntryController', StandUpEntryController);

    StandUpEntryController.$inject = ['StandUpEntryService'];

    function StandUpEntryController(standupEntryService) {
        var vm = this;

        vm.submitEntry = submitEntry;
        vm.addForm = addForm;
        vm.removeForm = removeForm;

        vm.entries = [];
        vm.allEntriesInDb = [];

        (function(){
            standupEntryService.getAllEntries().then(
                function (resp) {
                    vm.allEntriesInDb = resp;
                }, function (err) {
                    alert ('No Entries Found');
                })
        })();

        function submitEntry () {
            standupEntryService.createStandUpEntry(vm.entries).then(
                function (resp) {
                    swal('Success', "The entries were created", 'success');
                    vm.allEntriesInDb = resp;
                }, function (err) {
                    alert ('No Entries inserted, try again');
                })
        }

        function addForm() {
            var entryObject = {
                'date' : vm.entry.date,
                'plan' : vm.entry.plan,
                'email': vm.entry.email
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
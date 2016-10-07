/**
 * Created by mtucciarone on 13/05/2015.
 */
(function() {
    DatesModal.$inject = ['$modalInstance', 'alert', 'configAPI', 'preferredDateFormats'];
    angular.module('app.layout')
           .controller('DatesModal', DatesModal);

    /* @ngInject */
    function DatesModal($modalInstance, alert, configAPI, preferredDateFormats) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.layout";

        vm.SetAdvanced = setAdvanced;
        vm.Cancel = cancel;

        loadPage();

        //////////////////

        function loadPage() {
            configAPI.GetLexiconDateFormats()
                     .then(
                         function(data) {
                             if (preferredDateFormats && (preferredDateFormats.length > 0)) {
                                 // recipe contains data on preferred date formats (array of strings)
                                 preferredDateFormats.forEach(function(formatStr) {
                                     // populate vm.models.lists.A with the recipe data, in order
                                     vm.models.lists.A.list.push({label: formatStr});
                                 });
                                 data.forEach(function(record) {
                                     // now populate the unused ones from the API data
                                     if (preferredDateFormats.indexOf(record.format) === -1) {
                                         // if it's not in the left-hand column, it goes in the right-hand column
                                         vm.models.lists.B.list.push({label: record.format});
                                     }
                                 });
                             }
                             else {
                                 // use API data
                                 data.forEach(function(record) {
                                     (record.isDefault ? vm.models.lists.A : vm.models.lists.B).list.push({label: record.format});
                                 });
                             }
                         },
                         function(data) {
                             vm.error = alert.ErrorWriterModal(data, moduleName, '11', 'Error editing the group');
                         }
                     );
        }

        function setAdvanced() {
            // return the array of strings in the left-hand box
            $modalInstance.close(vm.models.lists.A.list.map(function(record) {
                return record.label;
            }));
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        vm.models = {
            selected: null,
            lists: {
                "A": {
                    title: "Date Formats to be Detected (Ordered)",
                    list: []
                }, "B": {
                    title: "Unused Date Formats",
                    list: []
                }
            }
        };

    }
})();
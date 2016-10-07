/**
 * Created by mtucciarone on 21/04/2015.
 */
(function() {
    Menu.$inject = ['$scope', 'access', 'jsonStorage', 'tools', '$state', 'router'];
    angular.module('app.layout')
           .controller('Menu', Menu);

    /* @ngInject */
    function Menu($scope, access, jsonStorage, tools, $state, router) {
        var vm = this;
        var loginRequiredModalOpen = false;
        var routes = router.getRoutes();
        vm.GetCurrentProject = getCurrentProject;
        vm.isCurrent = isCurrent;
        vm.navRoutes = populateMenu();
        vm.ProfileLink = {
            Title: access.GetUserFullName,
            name: 'profile'
        };
        vm.GeneralNav = jsonStorage.getItem("layout.menu", "GeneralNav");

        loadPage();

        //////////////////

        function populateMenu() {
            return routes.filter(function(route) {
                return route.settings;
            })
                         .sort(function(r1, r2) {
                             return r1.settings.nav - r2.settings.nav;
                         });
        }

        function getCurrentProject() {
            try {
                if (tools.cookies.get('currentProjectName')) {
                    vm.ProjectLoaded = true;
                    return tools.cookies.get('currentProjectName');
                }
            }
            catch (e) {
            }
        }

        function loadPage() {
            vm.show = false;
            vm.ProjectLoaded = false;
            vm.GetCurrentProject();
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return false;
            }
            var menuName = route.name;
            return $state.current.name.substr(0, menuName.length) === menuName;
        }

        $scope.$on('event:auth-loginRequired', function() {
            if (loginRequiredModalOpen) return;
            var modalInstance = tools.modal.open({
                templateUrl: 'layout/generic/retry-login-modal.html',
                controller: 'RetryModal',
                controllerAs: 'vm',
                backdrop: false
            });

            loginRequiredModalOpen = true;

            modalInstance.result.then(function() {
                loginRequiredModalOpen = false;
            }, function() {
                loginRequiredModalOpen = false;
            });
        });

        $scope.$on('event:auth-loginConfirmed', function() {

        });

        $scope.$watch(function() {
            return access.isLoggedIn;
        }, function(newVal) {
            vm.show = newVal;
        });

        $scope.$watch(function() {
            return access.GetUserFullName();
        }, function(newVal) {
            vm.ProfileLink.Title = access.GetUserFullName();
        });

        $scope.$watch(function() {
            return tools.cookies.get('currentProjectName');
        }, function(newVal) {
            vm.ProjectLoaded = newVal;
        });

    }
})();
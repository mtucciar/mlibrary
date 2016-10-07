/**
 * Created by mtucciarone on 05/04/2016.
 */
(function() {
    'use strict';

    jsonStorage.$inject = ['$state', 'tools', 'access', 'router'];
    angular.module('blocks.jsonStorage')
           .factory('jsonStorage', jsonStorage);

    /* @ngInject */
    /**
     * @namespace jsonStorage
     * @memberOf Factories
     * @param $state
     * @param tools
     * @param access
     * @param router
     * @returns {{getItem: getItem}}
     */
    function jsonStorage($state, tools, access, router) {
        var sdo = {
            getItem: getItem,
            CreateProject: createProject,
            DeleteProject: deleteProject,
            GetProjects: getProjects,
            GetProjectByName: getProjectByName
        };

        var localStorage = {
            "layout.menu": {
                "GeneralNav": [
                    {
                        Title: "Profile",
                        MenuLink: function() {
                            $state.go('profile', {}, {reload: true});
                        },
                        Visibility: true,
                        Icon: "fa fa-user"
                    },
                    {Visibility: true, Title: 'divider'},
                    {
                        Title: "About",
                        MenuLink: function() {
                            tools.modal.open({
                                templateUrl: 'layout/about/about.html',
                                controller: 'About',
                                controllerAs: 'vm'
                            });
                        },
                        Visibility: true,
                        Icon: "fa fa-font"
                    }, {
                        Title: "Logout",
                        MenuLink: access.logout,
                        Visibility: true,
                        Icon: "fa fa-sign-out"
                    }
                ]
            },
            "add.wizard": {
                "navigationItems": [
                    {
                        Title: 'Upload Local',
                        id: 'upload',
                        MenuLink: function() {
                            router.go('edit');
                        },
                        Image: "content/images/upload_icon.png",
                        Color: "success",
                        Visible: true
                    }, {
                        Title: 'Folder Files',
                        id: 'network',
                        MenuLink: function() {
                            router.go('edit');
                        },
                        Image: "content/images/network_folder.png",
                        Color: "info",
                        Visible: true
                    }
                ]
            }
        };

        var projects = [
            {
                id: "1",
                name: "Foobar Files",
                files: [
                    {
                        name: "Calm Snow",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "191"
                    },
                    {
                        name: "Break",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "227"
                    },
                    {
                        name: "White Lies",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "212"
                    },
                    {
                        name: "Everyone's Safe",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "246"
                    },
                    {
                        name: "Running With Scissors",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "262"
                    },
                    {
                        name: "Mobbin' Out",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "295"
                    },
                    {
                        name: "Walking on Gravetones",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "230"
                    },
                    {
                        name: "Light in the Cave",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "231"
                    },
                    {
                        name: "All In",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "262"
                    },
                    {
                        name: "Two Hearted",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "264"
                    },
                    {
                        name: "Portals",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "323"
                    },
                    {
                        name: "Yellow King",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "289"
                    }
                ],
                created: "2016-06-28T02:35:53.603Z"
            }
        ];

        return sdo;
        //////////////////

        /**
         * @memberOf Factories.jsonStorage
         * @param controllerName
         * @param jsonName
         * @returns {*}
         */
        function getItem(controllerName, jsonName) {
            return angular.copy(localStorage[controllerName][jsonName]);
        }

        function createProject(project) {
            projects.push(project);
        }

        function deleteProject(projectIndex) {
            projects = tools.RemoveElement(projects, projectIndex);
        }

        function getProjects() {
            return projects;
        }

        function getProjectByName(projectName) {
            var projectsFound = projects.filter(function(project) {
                return project.name.toLowerCase() === projectName.toLowerCase();
            });
            if (projectsFound)
                return projectsFound[0];
        }
    }
})();
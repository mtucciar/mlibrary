/**
 * Created by mtucciarone on 22/07/2015.
 */
(function() {
    'use strict';

    projectsAPI.$inject = ['$http', '$log', 'alert', 'tools'];
    angular.module('app.core')
           .factory('projectsAPI', projectsAPI);

    /* @ngInject */
    /**
     * @namespace projectsAPI
     * @memberOf APIs
     * @param $http
     * @param $log
     * @param alert
     * @param io
     * @param tools
     * @returns {{GetProjects: getProject, GetProject: getProject, CreateProject: createProject, UpdateProject: updateProject, DeleteProject: deleteProject, CloneProject: cloneProject, ClassifyModel: *, RunIntrospect: *, GetFiles: getFiles, UploadFile: uploadFile, DeleteFile: deleteFile, GetRMRecipe: *, GetLexiconRecipe: *, GetEclipseRecipe: *, CreateRMRecipe: *, CreateLexiconRecipe: *, CreateEclipseRecipe: *, UpdateRMRecipe: *, UpdateLexiconRecipe: *, UpdateEclipseRecipe: *, DeleteLexiconRecipe: *, MeasureRiskAsync: *, ComputeThreshold: computeThreshold, RunMaskAsync: *, RunDeid: *}}
     */
    function projectsAPI($http, $log, alert, tools) {
        var service = {
            GetProjects: getProject,
            GetProject: getProject,
            CreateProject: createProject,
            UpdateProject: updateProject,
            DeleteProject: deleteProject,
            CloneProject: cloneProject,

            ClassifyModel: runIntrospect('true'),
            RunIntrospect: runIntrospect('basic'),

            GetFiles: getFiles,
            UploadFile: uploadFile,
            DeleteFile: deleteFile,

            GetRMRecipe: getRecipe('threshold'),
            GetMeasurementRecipe: getRecipe('measurement'),
            GetLexiconRecipe: getRecipe('lexicon'),
            GetEclipseRecipe: getRecipe('transformation'),
            CreateMeasurementRecipe: createRecipe('measurement'),
            CreateRMRecipe: createRecipe('threshold'),
            CreateLexiconRecipe: createRecipe('lexicon'),
            CreateEclipseRecipe: createRecipe('transformation'),
            UpdateRMRecipe: updateRecipe('threshold'),
            UpdateMeasurementRecipe: updateRecipe('measurement'),
            UpdateLexiconRecipe: updateRecipe('lexicon'),
            UpdateEclipseRecipe: updateRecipe('transformation'),
            DeleteLexiconRecipe: deleteRecipe('lexicon'),

            MeasureRiskAsync: runOperation('measureRisk', 'riskMeasurement'),
            ComputeThreshold: computeThreshold,

            RunMaskAsync: runLexiconOperation('mask'),

            RunDeid: runOperation('transform', 'deid')
        };

        var baseURL = '/api/1.0/projects/';
        var zipTypes = ["application/zip", "application/x-zip-compressed"];
        var jsonHeaderProject = {
            'Content-Type': 'application/vnd.privacyanalytics.project+json',
            'Accept': 'application/vnd.privacyanalytics.project+json'
        };
        var jsonHeaderRecipe = {
            threshold: {
                'Content-Type': 'application/vnd.privacyanalytics.threshold.thresholdrecipe+json'
            },
            lexicon: {
                'Content-Type': 'application/vnd.privacyanalytics.recipe.text+json',
                'Accept': 'application/vnd.privacyanalytics.recipe.text+json'
            },
            riskMeasurement: {
                'type': 'application/vnd.privacyanalytics.it-riskmeasurementrecipe+json'
            },
            deid: {
                'type': 'application/vnd.privacyanalytics.transformationrecipe+json'
            },
            transformation: {
                'Content-Type': 'application/vnd.privacyanalytics.transformationrecipe+json'
            },
            measurement: {
                'Content-Type': 'application/vnd.privacyanalytics.it-riskmeasurementrecipe+json'
            }
        };

        return service;
        //////////////////

        /**
         * @memberOf APIs.projectsAPI
         * @param method
         * @param dataType
         * @param relativeURL
         * @param logMsg
         * @param headers
         * @param data
         * @returns {*}
         */
        function makeRequest(method, dataType, relativeURL, logMsg, headers, data) {
            var request = {
                method: method,
                url: baseURL + relativeURL
            };

            if (headers)
                request.headers = headers;
            if (data)
                request.data = data;

            return $http(request)
                .then(function(data) {
                    if (logMsg) {
                        $log.info(logMsg);
                        $log.info(data.data);
                    }
                    return data.data;
                }, alert.HandleError(dataType, method.toLowerCase()));
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param file
         * @returns {{Content-Type: *}}
         */
        function getHeadersForFile(file) {
            return {
                'Content-Type': io.CorrectMIMEType(file)
            };
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @returns {*}
         */
        function getProject(projectName) {
            return makeRequest('GET',
                'project',
                (projectName ? window.encodeURIComponent(projectName) : ''));
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectObject
         * @returns {*}
         */
        function createProject(projectObject) {
            return makeRequest('POST',
                'project',
                '',
                '',
                jsonHeaderProject,
                angular.toJson(projectObject));
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectObject
         * @returns {*}
         */
        function updateProject(projectObject) {
            return makeRequest('PUT',
                'project',
                window.encodeURIComponent(projectObject.name),
                '',
                jsonHeaderProject,
                angular.toJson(projectObject));
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @returns {*}
         */
        function deleteProject(projectName) {
            return makeRequest('DELETE',
                'project',
                window.encodeURIComponent(projectName),
                '', // technically we want .then(function () {}, alert.blahblah...)
                jsonHeaderProject);
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @param newName
         * @returns {*}
         */
        function cloneProject(projectName, newName) {
            return makeRequest('POST',
                'project',
                "?copyFrom=" + window.encodeURIComponent(projectName) + "&copyTo=" + window.encodeURIComponent(newName),
                '',
                jsonHeaderProject);
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param setting
         * @returns {Function}
         */
        function runIntrospect(setting) {
            return function(projectName) {
                return makeRequest('GET',
                    'project',
                    window.encodeURIComponent(projectName) + "?introspect=" + setting,
                    'success introspect');
            };
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @returns {*}
         */
        function getFiles(projectName) {
            return makeRequest('GET',
                'content',
                window.encodeURIComponent(projectName) + '/source');
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @param file
         * @param exists
         * @returns {*}
         */
        function uploadFile(projectName, file, exists) {
            var ending = tools.InArray(file.type, zipTypes) ? "" : file.name;

            return makeRequest(exists ? 'PUT' : 'POST',
                'content',
                window.encodeURIComponent(projectName) + '/source/' + window.encodeURIComponent(ending),
                '',
                getHeadersForFile(file),
                file);
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @param fileName
         * @returns {*}
         */
        function deleteFile(projectName, fileName) {
            return makeRequest('DELETE',
                'content',
                window.encodeURIComponent(projectName) + '/source' + (fileName ? '/' + window.encodeURIComponent(fileName) : ''));
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param recipeType
         * @returns {Function}
         */
        function getRecipe(recipeType) {
            return function(projectName, recipeName) {
                return makeRequest('GET',
                    'recipe' + recipeType,
                    window.encodeURIComponent(projectName) + '/recipes/' + window.encodeURIComponent((angular.isDefined(recipeName) ? recipeName : projectName)),
                    '',
                    jsonHeaderRecipe[recipeType]);
            };
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param recipeType
         * @returns {Function}
         */
        function createRecipe(recipeType) {
            return function(projectName, recipeObject) {
                return makeRequest('POST',
                    'recipe' + recipeType,
                    window.encodeURIComponent(projectName) + '/recipes',
                    '',
                    jsonHeaderRecipe[recipeType],
                    angular.toJson(recipeObject));
            };
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param recipeType
         * @returns {Function}
         */
        function updateRecipe(recipeType) {
            return function(projectName, recipeObject) {
                return makeRequest('PUT',
                    'recipe' + recipeType,
                    window.encodeURIComponent(projectName) + '/recipes/' + window.encodeURIComponent(recipeObject.name),
                    'updated recipe',
                    jsonHeaderRecipe[recipeType],
                    angular.toJson(recipeObject));
            };
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param recipeType
         * @returns {Function}
         */
        function deleteRecipe(recipeType) {
            return function(projectName, recipeName) {
                return makeRequest('DELETE',
                    'recipe' + recipeType,
                    window.encodeURIComponent(projectName) + '/recipes/' + window.encodeURIComponent(recipeName),
                    'delete recipe',
                    jsonHeaderRecipe[recipeType]);
            };
        }

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param operationName
         * @param recipeType
         * @returns {Function}
         */
        function runOperation(operationName, recipeType) {
            return function(projectName, recipeObject) {
                var currentDate = new Date();
                var theDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + " @ " + addZero(currentDate.getHours()) + ":" + addZero(currentDate.getMinutes()) + ":" + addZero(currentDate.getSeconds());
                return $http({
                    method: 'POST',
                    url: baseURL + window.encodeURIComponent(projectName) + "?operation=" + operationName + "&jobName=" + window.encodeURIComponent(projectName + " - " + (recipeType === "riskMeasurement" ? tools.CapitalizeString(recipeObject.measurementType) : "transform") + " - " + theDate) + "&async=1",
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: function(data) {
                        var formData = new FormData();
                        formData.append("recipe", new Blob([angular.toJson(recipeObject)], jsonHeaderRecipe[recipeType]));
                        return formData;
                    },
                    data: {model: recipeObject}
                })
                    .then(function(data) {
                        return data.data;
                    }, alert.HandleError("risk", "post"));
            };
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @returns {*}
         */
        function computeThreshold(projectName) {
            return makeRequest('POST',
                'threshold',
                window.encodeURIComponent(projectName) + '?recipe=' + window.encodeURIComponent(projectName) + '&operation=computeThreshold',
                '',
                jsonHeaderProject);
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param operation
         * @returns {Function}
         */
        function runLexiconOperation(operation) {
            return function(projectName, recipeName) {
                var currentDate = new Date();
                var theDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + " @ " + addZero(currentDate.getHours()) + ":" + addZero(currentDate.getMinutes()) + ":" + addZero(currentDate.getSeconds());
                return makeRequest('POST',
                    'project',
                    window.encodeURIComponent(projectName) + '?recipe=' + window.encodeURIComponent((angular.isDefined(recipeName) ? recipeName : projectName)) + '&operation=' + operation + '&jobName=' + window.encodeURIComponent(projectName + " - " + tools.CapitalizeString(operation) + " - " + theDate) + '&async=1',
                    '',
                    jsonHeaderProject);
            };
        }
    }
})();

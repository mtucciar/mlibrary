/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.listen')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
        var showErrors = true;
        /* @ngInject */
        getMeasurementRecipe.$inject = ['projectsAPI', 'config', 'router', 'alert', 'tools'];
        getCurrentProject.$inject = ['projectsAPI', 'alert', 'tools', 'router', 'jsonStorage'];
        function getCurrentProject(projectsAPI, alert, tools, router, jsonStorage) {
            var currentProjectName = tools.cookies.get("currentProjectName");
            if (!angular.isDefined(currentProjectName)) {
                alert.ErrorWriterNoCallback('app.listen', '99', 'Project is not loaded');
                router.resetRoutes();
                router.go("status");
                showErrors = false;
                return;
            }
            return projectsAPI.GetProject(currentProjectName)
                              .then(function(project) {
                                  tools.log.info(project);
                                  if (!angular.isDefined(project.model)) {
                                      alert.ErrorWriterNoCallback('app.listen', '18', "No model exists for this project.");
                                      router.go('status');
                                  }
                                  if (!angular.isDefined(project.model.prevalence)) {
                                      project.riskAssessmentName = project.name;
                                      project.model.population = jsonStorage.getItem("context", "PopulationSizes")[0].size;
                                      project.model.prevalence = 1;
                                      return projectsAPI.UpdateProject(project)
                                                        .then(function(newerProject) {
                                                            tools.log.info("updated project");
                                                            return newerProject;
                                                        }, alert.ErrorWriter('app.listen', '12', 'Error updating the project'));
                                  }
                                  else {
                                      return project;
                                  }
                              }, function(data) {
                                  if (showErrors)
                                      alert.ErrorWriterNoCallback('app.listen', '22', 'Error getting project', data);
                                  router.go("status");
                              });
        }

        /* @ngInject */
        function getMeasurementRecipe(projectsAPI, config, router, alert, tools) {
            if (config.appId !== "lexicon") {
                var currentProjectName = tools.cookies.get("currentProjectName");
                return projectsAPI.GetMeasurementRecipe(currentProjectName, currentProjectName + "_measurement")
                                  .then(function(recipe) {
                                      tools.log.info(recipe);
                                      return recipe;
                                  }, function(data) {
                                      if (showErrors)
                                          alert.ErrorWriterNoCallback('app.listen', '53', 'Error getting measurement recipe', data);
                                      router.go("status");
                                  });
            }
            else {
                return null;
            }
        }

        return [
            {
                name: 'listen',
                config: {
                    url: '/listen',
                    templateUrl: 'listen/listen.html',
                    controller: 'Listen',
                    controllerAs: 'vm',
                    title: 'Listen',
                    helpPage: 'Listen',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-music fa-lg pad-right-2 pad-top"></i><b>Listen</b>',
                        enabled: false
                    },
                    resolve: {
                        currentProject: getCurrentProject,
                        measurementRecipe: getMeasurementRecipe
                    }
                }
            }
        ];
    }
})();
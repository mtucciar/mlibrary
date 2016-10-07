/**
 * Created by mtucciarone on 17/08/2015.
 */
(function() {

    Listen.$inject = ['$scope', 'config', 'alert', 'tools', 'jsonStorage', 'router', 'defaultriskassessmentsAPI', 'riskassessmentsAPI', 'thresholdsAPI', 'projectsAPI', 'currentProject', 'measurementRecipe'];
    angular.module('app.listen')
           .controller('Listen', Listen);

    /* @ngInject */
    function Listen($scope, config, alert, tools, jsonStorage, router, defaultriskassessmentsAPI, riskassessmentsAPI, thresholdsAPI, projectsAPI, currentProject, measurementRecipe) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.listen";
        $scope.SelectFile = selectFile;

        vm.currentProject = currentProject;
        vm.appId = config.appId;
        vm.HasLoaded = false;
        vm.SupportedFileFormats = ["application/pdf"];
        vm.ResetValues = resetValues;
        vm.OpenIOP = openIOP;
        vm.currentRiskSettings = {};
        vm.dataDetails = {};
        vm.tempInput = {};
        vm.CustomPopulation = customPopulation;
        vm.SaveModel = saveModel;
        vm.isEditingInput = false;
        vm.StartEditInput = startEditInput;
        vm.DiscardInputChanges = discardInputChanges;
        vm.GoBack = goBack;
        vm.RunRiskMeasurement = runRiskMeasurement;
        vm.SkipToDeid = skipToDeid;
        vm.PopulationSizes = jsonStorage.getItem("context", "PopulationSizes");
        vm.privacyAndSecuritySlider = new slider('securityControls', 2, 0, 3, ["None",
            "Low",
            "HIPAA",
            "High"]);
        vm.recipientTrustSlider = new slider('recipientTrust', 1, 0, 3, ["None",
            "Low",
            "Medium",
            "High"]);
        vm.iopSlider = new slider('privacy', 3, 0, 7, ["Low:0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "High:7"]);

        loadTooltips();
        loadPage();

        //////////////////

        function loadPage() {
            convertFromModelToTemp();
            getRecipeOrCreate();
        }

        function loadTooltips() {
            vm.loadMitigatingCtrlsTip = dict.LoadMitigatingCtrlsRAQButton;
            vm.loadMotiveCapacityTip = dict.LoadMotiveCapacityContractRAQButton;
            vm.loadIOPTip = dict.LoadIoPRAQButton;
            vm.saveTip = dict.DiskIcon;
            vm.pencilTip = dict.PencilIcon;
            vm.cancelTip = dict.CancelIcon;
        }

        function getRecipeOrCreate() {
            var createResult = function(recipe) {
                vm.currentRecipe = recipe;
                tools.log.info("recipe:");
                tools.log.info(recipe);
                thresholdsAPI.ComputeProjectThreshold(vm.currentProject.name)
                             .then(function(thresholdResult) {
                                 vm.privacyAndSecuritySlider.SetThresholdRecipe(vm.currentRecipe, updateThreshold);
                                 vm.privacyAndSecuritySlider.LoadPDF = function() {
                                     uploadedFileTrigger('#privacyAndSecurity');
                                 };
                                 vm.privacyAndSecuritySlider.DeletePDF = function() {
                                     removePDF("Privacy & Security Assessment", 'securityControls');
                                 };
                                 vm.recipientTrustSlider.SetThresholdRecipe(vm.currentRecipe, updateThreshold);
                                 vm.recipientTrustSlider.LoadPDF = function() {
                                     uploadedFileTrigger('#recipientTrust');
                                 };
                                 vm.recipientTrustSlider.DeletePDF = function() {
                                     removePDF("Recipient Trust Assessment", 'recipientTrust');
                                 };
                                 vm.iopSlider.SetThresholdRecipe(vm.currentRecipe, updateThreshold);
                                 vm.iopSlider.DeletePDF = function() {
                                     removeIOPFormPDF();
                                 };
                                 loadThresholdValues(thresholdResult);
                                 vm.HasLoaded = true;
                             }, function(data) {
                                 tools.log.info(data);
                                 tools.log.info("error getting default thresholds!");
                                 alert.ErrorWriterNoCallback(moduleName, '22', 'Error getting thresholds', data);
                                 router.go('status');
                             });
            };

            return projectsAPI.GetRMRecipe(vm.currentProject.name)
                              .then(createResult, function() {
                                      var recipeObject = {
                                          "name": vm.currentProject.name
                                      };
                                      projectsAPI.CreateRMRecipe(vm.currentProject.name, recipeObject)
                                                 .then(createResult, alert.ErrorWriter(moduleName, '33', 'Error creating recipe')
                                                 );
                                  }
                              );
        }

        function uploadedFileTrigger(elementName) {
            tools.timeout(function() {
                angular.element(elementName)
                       .trigger('click');
            }, 1);
        }

        function removePDF(formalName, sliderName) {
            tools.modal.open({
                templateUrl: 'layout/generic/action-modal.html',
                controller: 'ActionModal',
                controllerAs: 'vm',
                resolve: {
                    object: function() {
                        return formalName;
                    },
                    action: function() {
                        return "remove";
                    },
                    explanation: function() {
                        return "";
                    }
                }
            })
                 .result
                 .then(function(confirmed) {
                     if (confirmed) {
                         riskassessmentsAPI.RemoveForm(vm.currentProject.name, sliderName)
                                           .then(function() {
                                               thresholdsAPI.ComputeProjectThreshold(vm.currentProject.name)
                                                            .then(function(thresholdResult) {
                                                                loadThresholdValues(thresholdResult);
                                                            }, alert.ErrorWriter(moduleName, '28', 'Error computing threshold'));
                                           }, alert.ErrorWriter(moduleName, '29', 'Error deleting PDF'));
                     }
                 });
        }

        function removeIOPFormPDF() {
            tools.modal.open({
                templateUrl: 'layout/generic/action-modal.html',
                controller: 'ActionModal',
                controllerAs: 'vm',
                resolve: {
                    object: function() {
                        return "Data Sensitivity form";
                    },
                    action: function() {
                        return "remove";
                    },
                    explanation: function() {
                        return "";
                    }
                }
            })
                 .result
                 .then(function(confirmed) {
                     if (confirmed) {
                         vm.currentProject.privacy = null;
                         projectsAPI.UpdateProject(vm.currentProject)
                                    .then(function(project) {
                                        vm.currentProject = project;
                                        thresholdsAPI.ComputeProjectThreshold(vm.currentProject.name)
                                                     .then(function(thresholdResult) {
                                                         loadThresholdValues(thresholdResult);
                                                     }, alert.ErrorWriter(moduleName, '30', 'Error computing threshold'));
                                    }, alert.ErrorWriter(moduleName, '31', 'Error filling out Data Sensitivity Assessment'));
                     }
                 });
        }

        function loadThresholdValues(thresholdResult) {
            vm.iopSlider.SetSliderValue(thresholdResult.scores.privacy);
            vm.privacyAndSecuritySlider.SetSliderValue(thresholdResult.scores.securityControls);
            vm.recipientTrustSlider.SetSliderValue(thresholdResult.scores.recipientTrust);
        }

        function customPopulation(popItem) {
            if (popItem) {
                if (popItem.id === "custom") {
                    vm.customPopulation = true;
                    if (popItem.size === -1) popItem.size = 0;
                }
                else {
                    vm.customPopulation = false;
                    vm.CustomPopulationEdit = false;
                }
                saveModel();
            }
        }

        function resetValues() {
            delete vm.currentRecipe.scores;
            tools.log.info('resetValues');
            tools.log.info(vm.currentRecipe);
            updateThreshold(vm.currentRecipe);
        }

        function openIOPModal(IOPForm, IOPFormResponse) {
            tools.modal.open({
                templateUrl: 'measurementResults/modals/iop-form.html',
                controller: 'DataSensitivityForm',
                controllerAs: 'vm',
                resolve: {
                    currentProject: function() {
                        return vm.currentProject;
                    },
                    formTemplate: function() {
                        return IOPForm;
                    },
                    formResponse: function() {
                        return IOPFormResponse;
                    }
                }
            })
                 .result
                 .then(function(project) {
                     if (project) {
                         vm.currentProject = project;
                         // remove -pr value in the recipe
                         delete vm.currentRecipe.scores.privacy;
                         updateThreshold(vm.currentRecipe);
                     }
                 });
        }

        function openIOP() {
            // get iop form and if 404 then call defaults API
            // otherwise just use the iop form returned
            defaultriskassessmentsAPI.GetForm("privacy")
                                     .then(function(IOPForm) {
                                         openIOPModal(IOPForm, vm.currentProject.privacy);
                                     }, alert.ErrorWriter(moduleName, '35', 'Error getting Data Sensitivity assessment'));
        }

        function convertFromModelToTemp() {
            if (tools.Exists(vm.currentProject.model.prevalence)) {
                var popItem = tools.ExtractElement(vm.PopulationSizes, 'size', vm.currentProject.model.population);
                tools.log.info(popItem);
                if (popItem) {
                    vm.dataDetails.populationItem = popItem;
                }
                else {
                    // if (!tools.Exists(vm.currentProject.model.population)) {
                    //     vm.dataDetails.populationItem = vm.PopulationSizes[2];
                    // }
                    // else {
                    vm.dataDetails.populationItem = vm.PopulationSizes[2];
                    vm.dataDetails.populationItem.size = vm.currentProject.model.population;
                    vm.customPopulation = true;
                    // }
                }
            }
            else {
                vm.dataDetails.populationItem = vm.PopulationSizes[0];
                vm.dataDetails.populationItem.size = vm.PopulationSizes[0].size;
            }

            vm.dataDetails.tempPrevalence = (tools.Exists(vm.currentProject.model.prevalence)) ?
                (vm.currentProject.model.prevalence * 100).toPrecision(6) : 100;

            // should this be switching on model.prevalence or model.sexSpecific?
            vm.dataDetails.sexSpecific = (tools.Exists(vm.currentProject.model.prevalence)) ?
                (vm.currentProject.model.sexSpecific) : false;

            // T2 settings here
            vm.dataDetails.t2 = {};
            if (tools.Exists(vm.currentProject.model.t2Enabled)) {
                vm.dataDetails.t2Enabled = vm.currentProject.model.t2Enabled;
                if (vm.currentProject.model.t2Population) {
                    vm.dataDetails.samePopulation = false;
                    vm.dataDetails.t2Population = vm.currentProject.model.t2Population;
                }
                else {
                    vm.dataDetails.samePopulation = true;
                }
            }
            else {
                vm.dataDetails.t2Enabled = true;
                vm.dataDetails.samePopulation = true;
                vm.dataDetails.t2Population = 0;
            }

            vm.madeChanges = false;
            vm.HasLoaded = true;
        }

        function updateThreshold(theRecipe) {
            tools.log.info(theRecipe);
            projectsAPI.UpdateRMRecipe(vm.currentProject.name, theRecipe)
                       .then(function(recipe) {
                           tools.log.info(recipe);
                           vm.currentRecipe = recipe;
                           thresholdsAPI.ComputeProjectThreshold(vm.currentProject.name)
                                        .then(function(thresholdResult) {
                                            vm.privacyAndSecuritySlider.SetThresholdRecipe(vm.currentRecipe, updateThreshold);
                                            vm.recipientTrustSlider.SetThresholdRecipe(vm.currentRecipe, updateThreshold);
                                            vm.iopSlider.SetThresholdRecipe(vm.currentRecipe, updateThreshold);
                                            loadThresholdValues(thresholdResult);
                                        }, alert.ErrorWriter(moduleName, '18', 'Error computing threshold'));
                       }, alert.ErrorWriter(moduleName, '19', 'Error updating recipe'));
        }

        function goBack() {
            if (vm.currentProject.model && vm.currentProject.model.tables) {
                if (vm.currentProject.model.tables.length > 1) {
                    router.go('edit');
                }
                else {
                    router.go('add.summary');
                }
            }
        }

        function selectFile(file, fileType) {
            if (file.files[0]) {
                vm.currentSelectedFile = file.files[0];
                var returnCode = io.ValidateFile(file.files[0], vm.SupportedFileFormats);
                if (returnCode) {
                    vm.currentSelectedFile = null;
                    if (returnCode === 1)
                        alert.ErrorWriterNoCallback(moduleName, '20', 'Selected file is too big to upload');
                    if (returnCode === 2)
                        alert.ErrorWriterNoCallback(moduleName, '21', 'No support for this type of file: ' + file.files[0].type);
                    vm.currentSelectedFile = "";
                }
                else {
                    if (fileType === 'ds') {
                        vm.privacyAndSecuritySlider.UploadPDF(vm.currentProject.name, vm.currentSelectedFile);
                    }
                    if (fileType === 'rs') {
                        vm.recipientTrustSlider.UploadPDF(vm.currentProject.name, vm.currentSelectedFile);
                    }
                }
                file.value = null;
            }
        }

        function convertTempToAPI(datadetails) {
            vm.currentProject.model.prevalence = (datadetails.tempPrevalence * 0.01).toPrecision(6);
            vm.currentProject.model.population = datadetails.populationItem.size;
            vm.currentProject.model.sexSpecific = datadetails.sexSpecific;
            vm.currentProject.model.t2Enabled = datadetails.t2Enabled;
            vm.currentProject.model.t2Population = null;
            if (datadetails.t2Enabled && datadetails.samePopulation === false) {
                vm.currentProject.model.t2Population = datadetails.t2Population;
            }
            if (datadetails.t2Enabled && datadetails.samePopulation === true) {
                vm.currentProject.model.t2Population = null;
            }
        }

        function saveModel() {
            if (vm.dataDetailsForm.$valid) {
                vm.CustomPopulationEdit = false;
                vm.CustomT2PopulationEdit = false;
                vm.prevEdit = false;
                vm.isEditingInput = false;
                convertTempToAPI(vm.dataDetails);
                projectsAPI.UpdateProject(vm.currentProject)
                           .then(function(project) {
                               tools.log.info("updated project");
                               vm.currentProject = project;
                           }, alert.ErrorWriter(moduleName, '12', 'Error updating the project'));
            }
        }

        function startEditInput(type, input) {
            vm.isEditingInput = true;
            if (type === "pop") {
                vm.CustomPopulationEdit = true;
                vm.tempInput.pop = input;
            }
            else if (type === "t2pop") {
                vm.CustomT2PopulationEdit = true;
                vm.tempInput.t2pop = input;
            }
            else {
                vm.prevEdit = true;
                vm.tempInput.prev = input;
            }
        }

        function discardInputChanges(type) {
            vm.isEditingInput = false;
            if (type === "pop")
                vm.CustomPopulationEdit = false;
            else if (type === "t2pop")
                vm.CustomT2PopulationEdit = false;
            else
                vm.prevEdit = false;
        }

        function projectIsValid(project) {
            if (project.isModelValid) {
                vm.ModelInvalidMessages = "";
                vm.ModelInvalid = false;
                return true;
            }
            else {
                vm.ModelInvalid = true;
                var data = {
                    data: {
                        errorMessage: Array.from(new Set(project.modelValidationErrors))
                                           .map(function(error) {
                                               return error;
                                           })
                    }
                };
                alert.ErrorWriterNoCallback(moduleName, '89', project.modelValidationErrors[0], data);

                return false;
            }
        }

        function runRiskMeasurement() {
            function runMeasureRisk() {
                var tempProject = angular.copy(vm.currentProject);
                var hasRiskAssessment = (tempProject.riskAssessmentName === tempProject.name);
                if (!hasRiskAssessment)
                    tempProject.riskAssessmentName = tempProject.name;
                projectsAPI.UpdateProject(tempProject)
                           .then(function(project) {
                               tempProject = project;
                               alert.SuccessWriter("started measurement");
                               projectsAPI.MeasureRiskAsync(vm.currentProject.name, measurementRecipe)
                                          .then(tools.timeout(function() {
                                              router.go('status');
                                          }, 700), alert.ErrorWriter(moduleName, '09', 'Error measuring the risk'));
                           }, alert.ErrorWriter(moduleName, '12', 'Error updating the project'));
            }

            var allDIsMasked = modelTools.AreAllDIsMasked(vm.currentProject.model.tables);
            var allQIsMasked = modelTools.AreAllQIsMasked(vm.currentProject.model.tables);

            var isProjectValid = projectIsValid(vm.currentProject);

            if (allDIsMasked && allQIsMasked) {
                alert.ErrorWriterNoCallback(moduleName, '11', "You do not have anything to measure risk on");
                router.setRouteStates(['deidentify'], false);
                return;
            }
            else if (!allDIsMasked && vm.appId !== 'eclipse') {
                tools.modal.open({
                    templateUrl: 'layout/generic/action-modal.html',
                    controller: 'ActionModal',
                    controllerAs: 'vm',
                    resolve: {
                        object: function() {
                            return "risk measurement";
                        },
                        action: function() {
                            return "continue";
                        },
                        explanation: function() {
                            return "You have unmasked Direct Identifiers.";
                        }
                    }
                })
                     .result
                     .then(function(confirmed) {
                         if (confirmed) {
                             if (isProjectValid)
                                 runMeasureRisk();
                         }
                     });
            }
            else {
                if (isProjectValid)
                    runMeasureRisk();
            }
        }

        function skipToDeid() {
            var allDIsMasked = modelTools.AreAllDIsMasked(vm.currentProject.model.tables);
            var allQIsMasked = modelTools.AreAllQIsMasked(vm.currentProject.model.tables);

            var isProjectValid = projectIsValid(vm.currentProject);

            if (allDIsMasked && allQIsMasked) {
                alert.ErrorWriterNoCallback(moduleName, '12', "You do not have anything to apply de-identification to");
                router.setRouteStates(['deidentify'], false);
                return;
            }
            if (isProjectValid) {
                convertTempToAPI(vm.dataDetails);
                projectsAPI.UpdateProject(vm.currentProject)
                           .then(function(project) {
                               vm.currentProject = project;
                               router.getRouteState('measurementResults') ? router.go('measurementResults') : router.go("deidentify", true);
                           }, alert.ErrorWriter(moduleName, '65', 'Error updating the project'));
            }
        }

    }
})();
/**
 * Created by mtucciarone on 12/01/2016.
 */
(function() {
    'use strict';

    badSymbols.$inject = ['tools'];
    angular.module('blocks.inputValidation')
           .provider('validationConfig', validationConfig);

    angular.module('blocks.inputValidation')
           .factory('badSymbols', badSymbols)
           .factory('onlyNumbers', onlyNumbers)
           .factory('prevalencePercentage', prevalencePercentage);

    /* @ngInject */
    /**
     * @namespace validationConfig
     * @memberOf Factories
     */
    function validationConfig() {
        /* jshint validthis:true */
        this.constraints = {
            'EmailForm': {
              'email': {
                  'required': {
                      message: 'This is an error message'
                  }
              }
            },
            'Group': {
                'groupName': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Group name must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Group name is required.'
                    }
                }
            },
            'User': {
                'userName': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Username must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Username is required.'
                    },
                    'badSymbols': {
                        'symbols': [":"],
                        'message': "Username cannot contain a colon"
                    }
                },
                'displayName': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Display name must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Display name is required.'
                    }
                },
                'emailAddress': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Email address must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Email address is required.'
                    },
                    email: {
                        "message": "Must be a valid email address."
                    }
                },
                'password': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Password must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Password is required.'
                    }
                },
                'verifyPassword': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Password must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Password is required.'
                    }
                }
            },
            'Library': {
                'projectName': {
                    'badSymbols': {
                        'symbols': ["\\", "/", ":", "*", "?", "\"", "<", ">", "{", "}", "[", "]", ",", "^", "|"],
                        'message': 'Library Name cannot contain any of the following characters:' + '["\\", "/", ":", "*", "?", "\"", "<", ">", "{", "}", "[", "]", ",", "^", "|"]'
                    },
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Library name must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Library name is required.'
                    }
                }
            },
            'DataDetails': {
                'population': {
                    'min': {
                        'value': 1,
                        'message': "Population must be larger than 1"
                    },
                    'max': {
                        'value': 7500000000,
                        'message': "Population is too large"
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Population must be a whole number'
                    },
                    'required': {
                        'message': 'Custom population is required.'
                    }
                },
                't2Population': {
                    'min': {
                        'value': 1,
                        'message': "Population must be larger than 1"
                    },
                    'max': {
                        'value': 7500000000,
                        'message': "Population is too large"
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Population must be a whole number'
                    }
                },
                'percentage': {
                    'max': {
                        'value': 100,
                        'message': 'Must be less than or equal to 100'
                    },
                    'prevalencePercentage': {
                        'message': "Must be greater than 0.000001"
                    }
                }
            },
            'Network': {
                'sourceNetworkSuffix': {
                    'badSymbols': {
                        'symbols': [':'],
                        'message': 'Colon is not allowed here'
                    }
                },
                'targetNetworkSuffix': {
                    'size': {
                        'min': 0,
                        'message': 'Folder path is required'
                    },
                    'required': {
                        'message': 'Folder path is required.'
                    },
                    'badSymbols': {
                        'symbols': [':'],
                        'message': 'Colon is not allowed here'
                    }
                }
            },
            'Destination': {
                'targetNetworkSuffix': {
                    'badSymbols': {
                        'symbols': [':'],
                        'message': 'Colon is not allowed here'
                    }
                }
            },
            'Database': {
                'password': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Password must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Password is required.'
                    }
                }
            },
            'ChangeDatabase': {
                'password': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Password must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Password is required.'
                    }
                },
                'confirmPassword': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Password must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Password is required.'
                    }
                }
            },
            'DateFormat': {
                'date': {
                    'required': {
                        'message': 'Date format is required.'
                    }
                }
            },
            'DataGroup': {
                'groupName': {
                    'badSymbols': {
                        'symbols': ["\\", "/", ":", "*", "?", "\"", "<", ">", "{", "}", "[", "]", ",", "^", "|"],
                        'message': 'Library Name cannot contain any of the following characters:' + '["\\", "/", ":", "*", "?", "\"", "<", ">", "{", "}", "[", "]", ",", "^", "|"]'
                    },
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Library name must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Library name is required.'
                    }
                }
            },
            'Generalization': {
                'length': {
                    'min': {
                        'value': 1,
                        'message': "No negative value is allowed."
                    },
                    'required': {
                        'message': 'Length is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'subStrStart': {
                    'min': {
                        'value': 1,
                        'message': "Must start at first character or later"
                    },
                    'required': {
                        'message': 'Starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'start': {
                    'max': {
                        'value': 99999999999999999,
                        'message': "This is too large."
                    },
                    'required': {
                        'message': 'Starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'interval': {
                    'min': {
                        'value': 1,
                        'message': "Must be greater than 0"
                    },
                    'required': {
                        'message': 'Interval is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'startDouble': {
                    'max': {
                        'value': 99999999999999999,
                        'message': "This is too large."
                    },
                    'required': {
                        'message': 'Starting value is required.'
                    }
                },
                'intervalDouble': {
                    'min': {
                        'value': 0.000000000000000001,
                        'message': "Must be greater than 0"
                    },
                    'required': {
                        'message': 'Interval is required.'
                    }
                },
                'startingYear': {
                    'minLength': {
                        'number': 4,
                        'message': "The year must be four digits."
                    },
                    'maxLength': {
                        'number': 4,
                        'message': "The year must be four digits."
                    },
                    'required': {
                        'message': 'Starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    },
                    'onlyNumbers': {
                        'message': 'Must be a whole number'
                    }
                },
                'topCodeValue': {
                    'minLength': {
                        'number': 4,
                        'message': "The year must be four digits."
                    },
                    'maxLength': {
                        'number': 4,
                        'message': "The year must be four digits."
                    },
                    'required': {
                        'message': 'Starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    },
                    'onlyNumbers': {
                        'message': 'Must be a whole number'
                    }
                }
            },
            'DateShifting': {
                'shiftStart': {
                    'min': {
                        'value': -9999999999,
                        'message': "Shifting starting value must be larger"
                    },
                    'max': {
                        'value': 9999999999,
                        'message': "Shifting starting value must be smaller"
                    },
                    'required': {
                        'message': 'Shifting starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'shiftEnd': {
                    'min': {
                        'value': -9999999999,
                        'message': "Shifting ending value must be larger"
                    },
                    'max': {
                        'value': 9999999999,
                        'message': "Shifting ending value must be smaller"
                    },
                    'required': {
                        'message': 'Shifting ending value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'jitter': {
                    'min': {
                        'value': 1,
                        'message': "Jitter Dates value must be greater than 0 to jitter date interval"
                    },
                    'max': {
                        'value': 9999999999,
                        'message': "Jitter starting value must be smaller"
                    },
                    'required': {
                        'message': 'Jitter starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'timeShiftStart': {
                    'min': {
                        'value': -9999999999,
                        'message': "Shifting-time starting value must be larger"
                    },
                    'max': {
                        'value': 9999999999,
                        'message': "Shifting-time starting value must be smaller"
                    },
                    'required': {
                        'message': 'Shifting-time starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'timeShiftEnd': {
                    'min': {
                        'value': -9999999999,
                        'message': "Shifting-time ending value must be larger"
                    },
                    'max': {
                        'value': 9999999999,
                        'message': "Shifting-time ending value must be smaller"
                    },
                    'required': {
                        'message': 'Shifting-time ending value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                }
            }
        };

        this.$get = function() {
            return {
                constraints: this.constraints
            };
        };
    }

    /* @ngInject */
    /**
     * @namespace badSymbols
     * @memberOf Factories
     */
    function badSymbols(tools) {
        return {
            name: 'badSymbols',
            validate: function(value, args) {
                if (value) {
                    return !tools.ContainsAnyOf(value.toString(), args.symbols);
                }
                return true;
            }
        };
    }

    /* @ngInject */
    /**
     * @namespace onlyNumbers
     * @memberOf Factories
     */
    function onlyNumbers() {
        return {
            name: 'onlyNumbers',
            validate: function(value) {
                if (value) {
                    return !isNaN(value);
                }
                return true;
            }
        };
    }

    /* @ngInject */
    /**
     * @namespace prevalencePercentage
     * @memberOf Factories
     */
    function prevalencePercentage() {
        return {
            name: 'prevalencePercentage',
            validate: function(value, args) {
                if (value) {
                    return (value >= 0.000001 && value <= 100);
                }
                return false;
            }
        };
    }

})();
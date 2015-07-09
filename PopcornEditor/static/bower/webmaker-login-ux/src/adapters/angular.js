var ngModule = angular.module('ngWebmakerLogin', ['templates-ngWebmakerLogin']);

ngModule.factory('loginOptions', ['$rootScope',
  function ($rootScope) {
    // Webmaker apps don't use a single method for configuration, yay!
    if (window.angularConfig) {
      // Webmaker.org
      return {
        csrfToken: window.angularConfig.csrf,
        paths: window.angularConfig.loginPaths
      };
    } else if (window.eventsConfig) {
      // Webmaker Events (2)
      return {
        csrfToken: window.eventsConfig.csrf,
        paths: window.eventsConfig.loginPaths
      };
    } else if ($rootScope.WMP.config) {
      // Webmaker Profile
      return {
        csrfToken: $rootScope.WMP.config.csrf,
        paths: $rootScope.WMP.config.loginPaths
      };
    }
    console.warn('Could not locate a config on window.angularConfig, window.eventsConfig or $rootScope.WMP.config');
    return {};
  }
]);

ngModule.factory('focus', ['$timeout',
  function ($timeout) {
    return function (selector) {
      // Timeout used to ensure that the DOM has the input that needs to be focused on
      $timeout(function () {
        var el = angular.element(selector);
        if (!el || !el[0]) {
          return;
        }
        el[0].focus();
      }, 0);
    };
  }
]);

ngModule.directive('bindTrustedHtml', ['$compile',
  function ($compile) {
    return function (scope, element, attrs) {
      scope.$watch(
        function (scope) {
          // watch the 'bindUnsafeHtml' expression for changes
          return scope.$eval(attrs.bindTrustedHtml);
        },
        function (value) {
          // when the 'bindUnsafeHtml' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
      );
    };
  }
]);

ngModule.factory('wmLoginCore', ['$rootScope', '$location', '$timeout', 'loginOptions',
  function ($rootScope, $location, $timeout, loginOptions) {
    var LoginCore = require('../core');

    var core = new LoginCore(loginOptions);

    var searchObj = $location.search();

    $rootScope._user = {};

    function scrubSearch() {
      $location.search('uid', null);
      $location.search('token', null);
      $location.search('validFor', null);
    }

    // see if we can try to instantly log in with an OTP
    if (searchObj.uid && searchObj.token) {
      core.on('signedIn', function (user) {
        $timeout(function () {
          scrubSearch();
          $rootScope._user = user;
        }, 0);
      });
      core.on('signinFailed', function (uid) {
        // TODO: design?
        $timeout(function () {
          console.error('login failed for uid: ' + uid);
          scrubSearch();
          $rootScope.expiredLoginLink = true;
          $rootScope.signin(uid);
        }, 0);
      });
      core.instantLogin(searchObj.uid, searchObj.token, searchObj.validFor);
    }

    core.on('verified', function (user) {
      $timeout(function () {
        $rootScope._user = user ? user : {};
        $rootScope.$broadcast('verified', user);
      }, 0);
    });

    core.verify();

    return core;
  }
]);

ngModule.directive('wmJoinWebmaker', [
  function () {
    return {
      restrict: 'A',
      scope: {
        showCTA: '=showcta'
      },
      link: function ($scope, $element) {
        $element.on('click', function () {
          $scope.joinWebmaker();
        });
      },
      controller: ['$rootScope', '$scope', '$modal', '$timeout', 'focus', 'wmLoginCore',
        function ($rootScope, $scope, $modal, $timeout, focus, wmLoginCore) {
          $scope.joinWebmaker = $rootScope.joinWebmaker = function (email, username, agreeToTerms) {
            $modal.open({
              templateUrl: 'join-webmaker-modal.html',
              controller: ['$scope', '$modalInstance', 'email', 'username', 'showCTA', 'agreeToTerms', joinModalController],
              resolve: {
                email: function () {
                  return email;
                },
                username: function () {
                  return username;
                },
                showCTA: function () {
                  return !!$scope.showCTA;
                },
                agreeToTerms: function () {
                  return agreeToTerms;
                }
              }
            });
          };

          function joinModalController($scope, $modalInstance, email, username, showCTA, agreeToTerms) {

            var MODALSTATE = {
              inputEmail: 0,
              inputUsername: 1,
              welcome: 2
            };

            $scope.MODALSTATE = MODALSTATE;
            $scope.currentState = MODALSTATE.inputEmail;

            $scope.form = {};
            $scope.user = {};
            $scope.sendingRequest = false;

            var joinController = wmLoginCore.joinWebmaker(showCTA);

            if (email) {
              $scope.user.email = email;
            }
            if (username) {
              $scope.user.username = username;
            }

            $scope.user.agree = agreeToTerms;

            joinController.on('sendingRequest', function (state) {
              $timeout(function () {
                $scope.sendingRequest = state;
              }, 0);
            });

            joinController.on('displayEmailInput', function () {
              $timeout(function () {
                $scope.currentState = MODALSTATE.inputEmail;
                focus('input[focus-on="create-user-email"]');
                if ($scope.user.email !== undefined && joinController.validateEmail($scope.user.email) && $scope.user.agree !== undefined) {
                  joinController.submitEmail($scope.user.agree);
                  if ($scope.user.agree) {
                    $scope.skippedEmail = true;
                    joinController.validateUsername(username);
                  }
                }
              }, 0);
            });

            joinController.on('displayUsernameInput', function () {
              $timeout(function () {
                $scope.currentState = MODALSTATE.inputUsername;
                focus('input[focus-on="create-user-username"]');
              }, 0);
            });

            joinController.on('displayWelcome', function (user, showCTA) {
              $timeout(function () {
                $rootScope._user = user;
                if (showCTA) {
                  $scope.welcomeModalIdx = Math.floor(Math.random() * 2);
                } else {
                  $scope.simpleCTA = true;
                }
                $scope.currentState = MODALSTATE.welcome;
              }, 0);
            });

            joinController.on('displayAlert', function (alertId) {
              $timeout(function () {
                $scope.form.user.$setValidity(alertId, false);
              }, 0);
            });

            joinController.on('hideAlert', function (alertId) {
              $timeout(function () {
                $scope.form.user.$setValidity(alertId, true);
              }, 0);
            });

            $scope.validateEmail = function () {
              if (!$scope.user.email) {
                return;
              }

              joinController.validateEmail($scope.user.email);
            };

            $scope.submitEmail = function () {
              joinController.submitEmail($scope.user.agree);
            };

            $scope.agreeToTermsChanged = function () {
              joinController.agreeToTermsChanged($scope.user.agree);
            };

            $scope.validateUsername = function () {
              joinController.validateUsername($scope.user.username);
            };

            $scope.submitUser = function () {
              joinController.submitUser($scope.user);
            };

            $scope.close = function () {
              $modalInstance.close();
            };

            $scope.switchToSignin = function () {
              $modalInstance.close();
              $rootScope.signin($scope.user.email);
            };

            joinController.start();
          }
        }
      ]
    };
  }
]);

ngModule.directive('wmSignin', [
  function () {
    return {
      restrict: 'A',
      scope: {
        disablePersona: '=disablepersona'
      },
      link: function ($scope, $element) {
        $element.on('click', function () {
          $scope.signin();
        });
      },
      controller: ['$rootScope', '$scope', '$modal', '$timeout', '$location', 'focus', 'wmLoginCore',
        function ($rootScope, $scope, $modal, $timeout, $location, focus, wmLoginCore) {
          function signinModalController($scope, $modalInstance, uid, passwordWasReset, disablePersona) {
            var MODALSTATE = {
              enterUid: 0,
              checkEmail: 1,
              enterKey: 2,
              enterPassword: 3,
              resetRequestSent: 4
            };

            $scope.MODALSTATE = MODALSTATE;
            $scope.currentState = MODALSTATE.enterUid;
            $scope.passwordWasReset = passwordWasReset;
            $scope.sendingRequest = false;
            $scope.disablePersona = disablePersona;

            $scope.form = {};
            $scope.user = {};

            if (uid) {
              $scope.user.uid = uid;
            }

            var signinController = wmLoginCore.signIn();

            signinController.on('sendingRequest', function (state) {
              $timeout(function () {
                $scope.sendingRequest = state;
              }, 0);
            });

            signinController.on('displayEnterUid', function () {
              $timeout(function () {
                $scope.currentState = MODALSTATE.enterUid;
                focus('input[focus-on="login-uid"]');
              }, 0);
            });

            signinController.on('displayEnterPassword', function () {
              $timeout(function () {
                $scope.currentState = MODALSTATE.enterPassword;
                focus('input[focus-on="enter-password"]');
              }, 0);
            });

            signinController.on('displayEnterKey', function (verified) {
              $timeout(function () {
                $scope.verified = verified;
                $scope.currentState = MODALSTATE.enterKey;
                focus('input[focus-on="enter-key"]');
              }, 0);
            });

            signinController.on('displayCheckEmail', function () {
              $timeout(function () {
                $scope.currentState = MODALSTATE.checkEmail;
              }, 0);
            });

            signinController.on('displayResetSent', function () {
              $timeout(function () {
                $scope.currentState = MODALSTATE.resetRequestSent;
              }, 0);
            });

            signinController.on('displayAlert', function (alertId) {
              $timeout(function () {
                $scope.form.user.$setValidity(alertId, false);
              }, 0);
            });

            signinController.on('hideAlert', function (alertId) {
              $timeout(function () {
                $scope.form.user.$setValidity(alertId, true);
              }, 0);
            });

            signinController.on('signedIn', function (user) {
              $rootScope._user = user;
              $modalInstance.close();
              $rootScope.$broadcast('login', user);
            });

            $scope.submitUid = function () {
              signinController.submitUid($scope.user.uid, $location.path());
            };

            $scope.enterKey = function () {
              signinController.displayEnterKey();
            };

            $scope.submitKey = function () {
              signinController.verifyKey($scope.user.uid, $scope.user.key, $scope.user.rememberMe);
            };

            $scope.submitPassword = function () {
              signinController.verifyPassword($scope.user.uid, $scope.user.password, $scope.user.rememberMe);
            };

            $scope.requestReset = function () {
              signinController.requestReset($scope.user.uid);
            };

            $scope.close = function () {
              $scope.user = {};
              $modalInstance.close();
            };

            $scope.switchToSignup = function () {
              var uid = $scope.user.uid,
                type = signinController.getUidType(uid),
                email = type === 'email' ? uid : '',
                username = type === 'username' ? uid : '';

              $modalInstance.close();
              $rootScope.joinWebmaker(email, username);
            };

            $scope.usePersona = function () {
              $rootScope.personaLogin();

              // the modal code calls scope.$apply, which can throw.
              // dropping it in this timeout fixes the race condition.
              $timeout($modalInstance.dismiss, 0);
            };

            signinController.start();

          }

          $scope.signin = $rootScope.signin = function (uid, passwordWasReset) {
            $modal.open({
              templateUrl: 'signin-modal.html',
              controller: ['$scope', '$modalInstance', 'uid', 'passwordWasReset', signinModalController],
              resolve: {
                uid: function () {
                  return uid;
                },
                passwordWasReset: function () {
                  return passwordWasReset;
                },
                disablePersona: function () {
                  return $scope.disablePersona;
                }
              }
            });
          };
        }
      ]
    };
  }
]);

ngModule.directive('wmPasswordReset', [
  function () {
    // Prevent multiple dialogs
    var triggered = false;
    return {
      restrict: 'A',
      controller: ['$rootScope', '$scope', '$location', '$timeout', '$modal', 'wmLoginCore',
        function ($rootScope, $scope, $location, $timeout, $modal, wmLoginCore) {

          var searchObj = $location.search();

          if (!searchObj.resetCode || !searchObj.uid || triggered) {
            return;
          }

          triggered = true;

          function passwordResetModalController($scope, $modalInstance, resetCode, uid) {
            $scope.form = {};
            $scope.password = {};
            $scope.sendingRequest = false;

            $scope.eightChars = angular.element('li.eight-chars');
            $scope.oneEachCase = angular.element('li.one-each-case');
            $scope.oneNumber = angular.element('li.one-number');

            function clearSearch() {
              $location.search('uid', null);
              $location.search('resetCode', null);
              $modalInstance.close();
            }

            var resetController = wmLoginCore.resetPassword();

            resetController.on('sendingRequest', function (state) {
              $timeout(function () {
                $scope.sendingRequest = state;
              }, 0);
            });

            resetController.on('displayAlert', function (alertId) {
              $timeout(function () {
                $scope.form.password.$setValidity(alertId, false);
              }, 0);
            });

            resetController.on('hideAlert', function (alertId) {
              $timeout(function () {
                $scope.form.password.$setValidity(alertId, true);
              }, 0);
            });

            resetController.on('checkConfirmPassword', function (status) {
              $timeout(function () {
                $scope.passwordsMatch = status;
              }, 0);

            });

            resetController.on('passwordCheckResult', function (result, blur) {
              $timeout(function () {
                // set to default statue
                if (!result) {
                  $scope.eightCharsState = $scope.oneEachCaseState = $scope.oneNumberState = 'default';
                  $scope.isValidPassword = false;
                  return;
                }

                $scope.eightCharsState = !result.lengthValid ? 'invalid' : blur ? 'valid' : '';
                $scope.oneEachCaseState = !result.caseValid ? 'invalid' : blur ? 'valid' : '';
                $scope.oneNumberState = !result.digitValid ? 'invalid' : blur ? 'valid' : '';
                $scope.isValidPassword = result.lengthValid && result.caseValid && result.digitValid;
              }, 0);
            });

            resetController.on('resetSucceeded', function () {
              $timeout(function () {
                clearSearch();
                $rootScope.signin(uid, true);
              }, 0);
            });

            $scope.checkPasswordStrength = function (blur) {
              resetController.checkPasswordStrength($scope.password.value, blur);
            };

            $scope.checkPasswordsMatch = function (blur) {
              if (!$scope.password.confirmValue) {
                return;
              }
              resetController.passwordsMatch($scope.password.value, $scope.password.confirmValue, blur);
            };

            $scope.submitResetRequest = function () {
              resetController.submitResetRequest(uid, resetCode, $scope.password.value);
            };

            $scope.close = function () {
              clearSearch();
              $modalInstance.close();
            };
          }

          $modal.open({
            templateUrl: 'reset-modal.html',
            controller: ['$scope', '$modalInstance', 'resetCode', 'uid', passwordResetModalController],
            resolve: {
              resetCode: function () {
                return searchObj.resetCode;
              },
              uid: function () {
                return searchObj.uid;
              }
            }
          });
        }
      ]
    };
  }
]);

// Legacy Persona login
ngModule.factory('wmPersona', ['$rootScope', 'wmLoginCore',
  function ($rootScope, wmLoginCore) {
    var personaController = wmLoginCore.personaLogin();

    $rootScope.personaLogin = function () {
      personaController.authenticate();
    };

    personaController.on('signedIn', function (user) {
      $rootScope._user = user;
    });

    personaController.on('newUser', function (email) {
      $rootScope.joinWebmaker(email);
    });
  }
]);

ngModule.directive('wmPersonaLogin', ['wmPersona',
  function () {
    return {
      restrict: 'A',
      link: function ($scope, $element) {
        $element.on('click', function () {
          $scope.personaLogin();
        });
      }
    };
  }
]);

ngModule.directive('wmLogout', ['$timeout', 'wmLoginCore',
  function ($timeout) {
    return {
      restrict: 'A',
      link: function ($rootScope, $element) {
        $element.on('click', function () {
          $rootScope.logout();
        });
      },
      controller: ['$rootScope', 'wmLoginCore',
        function ($rootScope, wmLoginCore) {
          var logoutController = wmLoginCore.logout();

          logoutController.on('loggedOut', function () {
            $timeout(function () {
              $rootScope._user = {};
              $rootScope.$broadcast('logout');
            }, 0);
          });

          $rootScope.logout = function () {
            logoutController.logout();
          };
        }
      ]
    };
  }
]);

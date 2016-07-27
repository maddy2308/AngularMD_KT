(function () {
    "use strict";

    angular
        .module('AngularMDApp', ['ngMaterial', 'angular.filter'])
        .config(function ($mdThemingProvider) {
            // Extend the red theme with a few different colors
            var bootstrapPrimaryMap = $mdThemingProvider.extendPalette('blue', {
                '500': '337ab7'
            });

            var bootstrapWarningMap = $mdThemingProvider.extendPalette('yellow', {
                '400': 'faebcc'
            });

            var bootstrapDangerMap = $mdThemingProvider.extendPalette('pink', {
                '400': 'ebccd1'
            });

            var bootstrapDefaultMap = $mdThemingProvider.extendPalette('grey', {
                '400': 'ddd'
            });

            $mdThemingProvider.definePalette('bootstrapPrimary', bootstrapPrimaryMap);
            $mdThemingProvider.definePalette('bootstrapWarning', bootstrapWarningMap);
            $mdThemingProvider.definePalette('bootstrapDanger', bootstrapDangerMap);
            $mdThemingProvider.definePalette('bootstrapDefault', bootstrapDefaultMap);

            $mdThemingProvider.theme('default')
                .primaryPalette('bootstrapPrimary')
                .warnPalette('bootstrapWarning')
                .accentPalette('bootstrapDanger')
                .backgroundPalette('bootstrapDefault')
        });

})();

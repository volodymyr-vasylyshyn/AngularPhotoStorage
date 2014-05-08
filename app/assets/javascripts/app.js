'use strict';

/* App Module */

var app = angular.module('app', [
  'ngRoute',
  // 'ngAnimations',
  'ngControllers',
  // 'ngFilters',
  'ngServices',
  'infinite-scroll'
]);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        templateUrl: '/assets/explore.html',
        controller: 'ExploreCtrl'
      }).
      when('/albums', {
        templateUrl: '/assets/albums.html',
        controller: 'AlbumsCtrl'
      }).
      when('/albums/:albumId', {
        templateUrl: '/assets/album.html',
        controller: 'AlbumsCtrl'
      }).
      when('/_=_', {
        redirectTo: '/'
      })
      // when('/my-followers', {
      //   templateUrl: 'partials/my_followers.html',
      //   controller: 'PhoneDetailCtrl'
      // }).
      // when('/albums/:albumId', {
      //   templateUrl: 'partials/album.html',
      //   controller: 'PhoneDetailCtrl'
      // }).
      // when('/photos/:photoId', {
      //   templateUrl: 'partials/photo.html',
      //   controller: 'PhoneDetailCtrl'
      // }).
      // when('/my-profile', {
      //   templateUrl: 'partials/my_profile.html',
      //   controller: 'PhoneDetailCtrl'
      // }).
  }]);


app.config(["$httpProvider", function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = document.getElementsByName("csrf-token")[0].content;
  $httpProvider.defaults.headers.common['Accept'] = "application/json";
}]);
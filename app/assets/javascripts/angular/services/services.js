'use strict';

/* Services */

var angularPhotoStorageServices = angular.module('ngServices', ['ngResource']);

angularPhotoStorageServices.factory('Photos', ['$resource',
  function($resource){
    return $resource('/api/v1/photos.json', {}, {
      query: {
        method:'GET',
        isArray: true,
        "transformResponse": function (data) {
          return JSON.parse(data).photos;
        }
      }
    });
  }]
);
angularPhotoStorageServices.factory('Albums', ['$resource',
  function($resource){
    return $resource('/api/v1/albums/:albumId', {albumId:'@albumId'}, {
      query: {
        method:'GET',
        isArray: true,
        "transformResponse": function (data) {
          return JSON.parse(data).albums;
        }
      },
      save: {
        method:'POST',
        "transformResponse": function (data) {
          return JSON.parse(data).album;
        }
      },
      get: {
        method:'GET',
        "transformResponse": function (data) {
          return JSON.parse(data).album;
        }
      }
    });
  }]
);
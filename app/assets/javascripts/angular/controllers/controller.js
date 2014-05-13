'use strict';

/* Controllers */

var ngControllers = angular.module('ngControllers', []);

ngControllers.controller('ExploreCtrl', ['$scope', '$http','Photos',
    function($scope, $http, Photos) {
        // $scope.photos = Photos.query();
        var counter = 1;
        $scope.busy = false;
        $scope.photos = [];
        $scope.isLastEmpty = false;
        // infinite scroll (load next page)
        $scope.load_data = function() {
            if ($scope.busy || $scope.isLastEmpty) return;
            $scope.busy = true;
            $http.get('/api/v1/photos.json'+'?page='+counter).success(function(data) {
                $scope.isLastEmpty = data.photos.length == 0;
                $scope.photos = $scope.photos.concat(data.photos);
                $scope.busy = false;
            });
            counter += 1; // increment page number for next request
        };
    }]
);
ngControllers.controller('AppCtrl', ['$scope', '$location',
  function($scope, $location) {
    $scope.isActive = function (url) {
        if (url ==  $location.url()) {
            return "active";
        } else {
            return "unactive";
        }
    };
  }]
);
ngControllers.controller('AlbumsCtrl', ['$scope', 'Albums',
  function($scope, Albums) {
    $scope.albums = Albums.query();
    $scope.addAlbum =  function(){
      var album = Albums.save($scope.newAlbum);
      $scope.albums.push(album);
      $scope.newAlbum = {};
    };
    $scope.delete = function(idx){
        var album_to_delete = $scope.albums[idx];
        Albums.remove({albumId:album_to_delete.id}, function(){
            $scope.albums.splice(idx, 1);
        });
    };
  }]
);
ngControllers.controller('AlbumCtrl', ['$scope', '$routeParams', 'Albums',
  function($scope, $routeParams, Albums) {
    $scope.album = Albums.get({albumId: $routeParams.albumId});
  }]
);
// ngControllers.controller('ImageUploaderCtrl', function ($scope, $routeParams,$fileUploader) {
//     // Creates a uploader
//     console.warn($scope.$parent.targetId)
//     var csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
//     var uploader = $scope.uploader = $fileUploader.create({
//         alias: 'image',
//         scope: $scope,
//         formData: [{
//             'targetId':  $routeParams[Object.keys($routeParams)[0]],
//             'targetType': $scope.$parent.targetType
//         }],
//         url: '/api/v1/photos',
//         headers : {
//           'X-CSRF-TOKEN' : csrf_token // X-CSRF-TOKEN is used for Ruby on Rails Tokens
//         },
//     });


//     // ADDING FILTERS

//     // Images only
//     uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
//         var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
//         type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
//         return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
//     });


//     // REGISTER HANDLERS

//     uploader.bind('afteraddingfile', function (event, item) {
//         console.info('After adding a file', item);
//     });

//     uploader.bind('whenaddingfilefailed', function (event, item) {
//         console.info('When adding a file failed', item);
//     });

//     uploader.bind('afteraddingall', function (event, items) {
//         console.info('After adding all files', items);
//     });

//     uploader.bind('beforeupload', function (event, item) {
//         console.info('Before upload', item);
//     });

//     uploader.bind('progress', function (event, item, progress) {
//         console.info('Progress: ' + progress, item);
//     });

//     uploader.bind('success', function (event, xhr, item, response) {
//         console.info('Success', xhr, item, response);
//     });

//     uploader.bind('cancel', function (event, xhr, item) {
//         console.info('Cancel', xhr, item);
//     });

//     uploader.bind('error', function (event, xhr, item, response) {
//         console.info('Error', xhr, item, response);
//     });

//     uploader.bind('complete', function (event, xhr, item, response) {
//         console.info('Complete', xhr, item, response);
//     });

//     uploader.bind('progressall', function (event, progress) {
//         console.info('Total progress: ' + progress);
//     });

//     uploader.bind('completeall', function (event, items) {
//         console.info('Complete all', items);
//     });
// });
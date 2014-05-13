app.directive('uploaderPartial', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope : {
      targetId: '@',
      targetType: '@'
    },
    controller: function ($scope, $routeParams,$fileUploader) {
      // Creates a uploader
      $scope.photos = [];
      $scope.hasElements = false;
      $scope.$watch('targetId', function(newValue, oldValue) {
        var csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        var uploader = $scope.uploader = $fileUploader.create({
            alias: 'image',
            scope: $scope,
            formData: [{
                'targetId':  newValue,
                'targetType': $scope.targetType
            }],
            url: '/api/v1/'+$scope.targetType+'/'+newValue+'/photos',
            headers : {
              'X-CSRF-TOKEN' : csrf_token // X-CSRF-TOKEN is used for Ruby on Rails Tokens
            },
        });

        $scope.$watch('uploader.getNotUploadedItems().length', function(newValue, oldValue) {
          $scope.hasElements = newValue > 0;
        });
        // ADDING FILTERS
        // Images only
        uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
            var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
            type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        });
        uploader.bind('success', function (event, xhr, item, response) {
          $scope.$parent.album.photos.push(response.photo);
          $scope.$parent.$apply();
        });
      });
    },
    templateUrl : '/assets/uploader.html'
  };
});

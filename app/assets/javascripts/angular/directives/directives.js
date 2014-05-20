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
app.directive('launchGallery', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$parent.showGallery = false;
      element.bind('click', function(){
        scope.$parent.photoIndex = parseInt(attrs.index, 10);
        scope.$parent.showGallery = true;
        scope.$parent.$apply();
      });
    }
  };
});
app.directive('imageGallery', function() {
  return {
    restrict: 'EA',
    scope: {
      photos: '=images'
    },
    controller: function ($scope, $window, $routeParams) {
      // initial image index
      $scope.$parent.$watch('photoIndex', function(newValue, oldValue){
        $scope._Index = newValue;
      });
      // if a current image is the same as requested image
      $scope.isActive = function (index) {
          return $scope._Index === index;
      };

      // show prev image
      $scope.showPrev = function () {
          $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
      };

      // show next image
      $scope.showNext = function () {
          $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
      };

      // show a certain image
      $scope.showPhoto = function (index) {
          $scope._Index = index;
      };
      $scope.navLeft = 15;
      $scope.navWidth = function () {
        return 102 * ($scope.photos.length + 1);
      };
      
      $scope.navStyleF = function () {
        return {
          left: $scope.navLeft + 'px',
          width: $scope.navWidth(),
          transition: 'all 1s ease'
        };
      };

      // hide gallery
      $scope.close = function () {
        $scope.$parent.showGallery = false;
      };
      $scope.moveNavLeft = function () {
        if($scope.navLeft > $window.innerWidth - 100 - $scope.navWidth())
          $scope.navLeft = $scope.navLeft - 104;
        $scope.navStyle = $scope.navStyleF();
      };
      $scope.moveNavRight = function () {
        if($scope.navLeft < 15)
          $scope.navLeft = $scope.navLeft + 104;        
        $scope.navStyle = $scope.navStyleF();
      };
      
    },
    templateUrl : '/assets/image-gallery.html'
  }
});
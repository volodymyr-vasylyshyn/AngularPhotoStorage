// app.directive('uploaderPartial', function() {
//   return {
//     restrict: 'E',
//     scope : {
//       targetId: '@',
//       targetType: '@'
//     },
//     link: function( scope, element, attrs, ctrl ) {
//       console.warn(scope, attrs);
//     },
//     templateUrl : '/assets/uploader.html',
//   };
// });
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
          // ADDING FILTERS
          // Images only
          uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
              var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
              type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          });
        });
      },
      templateUrl : '/assets/uploader.html'
    };
  });
// app.directive('whenScrolled', function() {
//     return function(scope, elm, attr) {
//       var raw = elm[0];
//       elm.bind('scroll', function() {
//         // calculating the time/space continuum needed to trigger the loading of the next pagination
//         console.warn('entering')
//         if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
//           scope.$apply(attr.whenScrolled);
//         }
//       });
//     };
//   });
var app = angular.module('app', []);

app

  .controller('fileModelCtrl', function($scope) {
    $scope.inputs = [
      { item: 1 },
      { item: 2 },
      { item: 3 }
    ]
    $scope.submit = function() {
      fileUpload.upload();
    }
  })
  .directive('fileModel', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind('change', function() {
          scope.$apply(function() {
            modelSetter(scope, element[0].files[0]);
          })
        });
      }
    }
  }])

.service('fileUpload', function($http) {
  this.upload = function(file, url) {
    var fd = new FormData();
    fd.append('file', file);
    $http.post(url, fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      })
      .success(function() {

      })
      .error(function() {

      })
  }
})

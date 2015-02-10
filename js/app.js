(function(){
  var app = angular.module('call-me-back', ['store-products', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav'])
  .config( [
    '$compileProvider',
    function( $compileProvider ) {
        var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
        var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0,-1)
        + '|chrome-extension:'
        +currentImgSrcSanitizationWhitelist.toString().slice(-1);

        console.log("Changing imgSrcSanitizationWhiteList from "+currentImgSrcSanitizationWhitelist+" to "+newImgSrcSanitizationWhiteList);
        $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);
    }
  ]);

  //-------------
  // Controllers
  //-------------
  app.controller('CallbackController', ['$scope', '$http', '$q', '$interval', function ($scope, $http, $q, $interval) {
    $scope.gridOptions = [];

    $scope.gridOptions.columnDefs = [
      { name: 'heat1', 'displayName': 'Heat 1' }
    ];

    $scope.saveRow = function( rowEntity ) {
      // TODO: This is a fake promise. Normally need to use the promise returned by $http or $resource
      var promise = $q.defer();
      $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );

      //TODO: This fakes a 1-second delay while saving
      $interval( function() {
        if ( isNaN(rowEntity.heat1) ) {
          promise.reject();
        } else {
          promise.resolve();
        }
      }, 1000, 1);
    };

    $scope.gridOptions.onRegisterApi = function(gridApi) {
      $scope.gridApi = gridApi;
      gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    };

    $http.get('/data/heat1.json').success(function(data) {
      $scope.gridOptions.data = data;
    });
  }]); // END app.controller('callbacks')

  app.controller('StoreController', [ '$http', function($http){
    var store = this;
    store.products = [ ];

    $http.get('/data/products.json').success(function(data){
      store.products = data;
    });
  }]);

  //------
  // Data
  //------
  var gems = [
 ,
  ];
})();
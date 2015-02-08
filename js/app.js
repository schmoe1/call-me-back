(function(){
  var app = angular.module('store', ['store-products'])
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
(function(){
  var app = angular.module('store-products', [])
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

  app.controller('ReviewController', function() {
    this.review = {};

    this.addReview = function(product) {
      this.review.createdOn = Date.now();
      product.reviews.push(this.review);
      this.review = {};
    };
  });

  app.directive('productTitle', function(){
    return {
      restrict: 'E',
      templateUrl: 'html/product-title.html'
    };
  });

  app.directive('productTabs', function(){
    return {
      restrict: 'E',
      templateUrl: 'html/product-tabs.html',
      controller:function(){
        this.tab = 1;

        this.setTab = function(newValue) {
          this.tab = newValue;
        };

        this.isSet = function(tabName) {
          return this.tab === tabName;
        };
      },
      controllerAs: 'tab'
    };
  });

  app.directive('productGallery', function(){
    return {
      restrict: 'E',
      templateUrl: 'html/product-gallery.html',
      controller: function(){
        this.current = 0;

        this.setCurrent = function(newCurrent){
          this.current = newCurrent || 0;
        }
      },
      controllerAs: 'gallery'
    };
  });
})();
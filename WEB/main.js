    // main.js
  var app = angular.module('app', ['ui.grid', 'ui.grid.edit', 'ui.grid.resizeColumns']);
 
  app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
 

  $scope.selectedDealClasses=[];
 
  
 
    $scope.gridOptions = {
      enableSorting: true,
      enableColumnResizing: true,
      enableRowSelection: true,
      columnDefs: null,
      data : null
    };
 
 
    $scope.tpclassoverview = {
      enableSorting: true,
      enableColumnResizing: true,
      enableRowSelection: true,
      columnDefs: null,
      data : null
    };
 
    $scope.metaData = {
      enableSorting: true,
      enableColumnResizing: true,
      enableRowSelection: true,
      columnDefs: null,
      data : null
    };

 
    $scope.startTS="2016";
    $scope.endTS="2017-01-01 00:00:00";
 
    
    $http.get("=dealClasses").then(function(response) {
      $scope.dealClasses = response.data;
   });
   
   
   
   $scope.loadData = function() {
         document.body.style.cursor = 'wait';
         $http.get("=getDeals", {params:{startTS:$scope.startTS, endTS:$scope.endTS, selectedDealClasses:angular.toJson($scope.selectedDealClasses)}}).then(function(response) {
           $scope.gridOptions.columnDefs = response.data
           $scope.loadData1();
           $http.get("=getDealsCount").then(function(response) {
             $scope.dealsCount = response.data
             $scope.getAggregation();
             $scope.getTradePartnerClassOveview();
             $scope.getMetaData();
           })

         });
   };       

   $scope.start = 0;
   $scope.count = 1000;

   $scope.loadData1 = function() {
     document.body.style.cursor = 'wait';
     $http.get("=getDealsData1", {params: {start:$scope.start,count:$scope.count}}).then(function(response) {
       $scope.gridOptions.data = response.data
       document.body.style.cursor = 'default';
     })
   }

   $scope.loadNext = function() {
     document.body.style.cursor = 'wait';
     $scope.start= parseInt($scope.start) + parseInt($scope.count);
     $http.get("=getDealsData1", {params: {start:$scope.start,count:$scope.count}}).then(function(response) {
       $scope.gridOptions.data = response.data
       document.body.style.cursor = 'default';
     })
   }
  
   $scope.loadPrev = function() {
     document.body.style.cursor = 'wait';
     $scope.start-=$scope.count;
     if ($scope.start < 0) { 
       $scope.start = 0;
     }
     $http.get("=getDealsData1", {params: {start:$scope.start,count:$scope.count}}).then(function(response) {
       $scope.gridOptions.data = response.data
       document.body.style.cursor = 'default';
     })
   }


   $scope.aggregationTable = {
     enableSorting: true,
     enableColumnResizing: true,
     enableRowSelection: true,
     columnDefs: null,
     data : null
    };
   
   
   $scope.getAggregation = function() {
     $http.get("=getAggregation").then(function(response) {
       $scope.aggregationTable.columnDefs = response.data;
       $http.get("=getAggregationData").then(function(response) {
       $scope.aggregationTable.data = response.data;
     });
   })
   };

   $scope.getTradePartnerClassOveview = function() {
     $http.get("=getTradeParterClassOverview").then(function(response) {
       $scope.tpclassoverview.columnDefs = response.data;
       $http.get("=getTradeParterClassOverviewData").then(function(response) {
       $scope.tpclassoverview.data = response.data;
     });
   })
   };


   $scope.getMetaData = function() {
     $http.get("=getTradePartnerMeta").then(function(response) {
       $scope.metaData.columnDefs = response.data;
       $http.get("=getTradePartnerMetaData").then(function(response) {
       $scope.metaData.data = response.data;
     });
   })
   };


   
   $scope.test = function() {
     $http.get("=test").then(function(response) {
       $scope.testData = response.data;
     });
   
   };

   $scope.test1 = function() {
     $http.get("=test").then(function(response) {
       $scope.testData = response.data;
     });
   
   };

   
}]);

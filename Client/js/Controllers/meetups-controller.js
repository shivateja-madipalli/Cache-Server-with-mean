angular.module('meetupApp.controllers', []).controller('ngAppDemoController', ['$scope', '$resource', function($scope, $resource){

  $scope.checkonSpeed = function () {
  	console.log("Entered CheckOnSpeed");
  	 var UrlValue = $scope.UrlValue;
  	 console.log("UrlValue on CLient Side" + UrlValue);
  	 var xyz = $resource("/URL/" + UrlValue);
	
	xyz.get({}, function(result){
		
			console.log(result.Data);
			var res = result.Data.split("#");
			console.log(res);
			//console.log("#############################3");
			$scope.Name = res[1];
			$scope.mySrc = res[4];
			$scope.Price = res[2]+ " Is the Price, according to Amazon";
			$scope.Descp = "This is the Product Description : "+res[3];
			$scope.CacheTime = res[5]+" Milli Seconds";
			//img.src = "";
			//console.log(JSON.stringify(res));
			//var JsonVal = "({";
			//for(var i=0;i<res.length;i++)
			//{
				//JsonVal = JsonVal + "IndividualVal : " + res[i];
			//}
			//JsonVal = JsonVal + "})";
			//$scope.Values = JsonVal;

			//$scope.Values = JSON.stringify(res);
	});
  }
}]);
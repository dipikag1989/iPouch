angular.module('starter.controllers', ['ionic','starter.controllers'])

.controller('HomeCtrl',['$scope','pouchdb','$ionicModal','$state',function($scope,pouchdb,$ionicModal,$state){
	var dbLocal = new PouchDB('ipouch14');
	var dbRemote = new PouchDB('http://192.168.0.109:5984/ipouch');

	$scope.init = function() {
		
		  // dbLocal.destroy().then(function() {
			 //    dbLocal = new PouchDB('ipouch14');
		  // });
		  var options = {
	      live: true,
	      retry: true,
	      continuous: true
	    };
		dbRemote.sync(dbLocal,options,function(err){
		    console.log(err);
		});
		// dbLocal.replicate.to(dbRemote,{live:true},function(err){
		//     console.log(err);
		// });
		if(!$scope.itemsdbRemote){
			$scope.itemsdbRemote=[];
		}
		if(!$scope.itemsdbLocal){
			$scope.itemsdbLocal=[];
		}
		
		dbLocal.allDocs({include_docs: true}).then(function(result) {
			console.log('re    var dbRemote = new s is',result.rows);
			$scope.itemsdbLocal=[];
		    for(var i=0;i<result.rows.length;i++){
		        var obj = {
		            "_id": result.rows[i].doc.id,
		            "expense": result.rows[i].doc.expense,
		            "amount": result.rows[i].doc.amount
		        }
		        $scope.itemsdbLocal.push(obj);
		        $scope.$apply();
		    }
		    
		}).catch(function(err) {
			    console.log(err);
		});
		dbRemote.allDocs({include_docs: true}).then(function(result) {
			console.log('re    var dbRemote = new s is',result.rows);
			$scope.itemsdbRemote=[];
		    for(var i=0;i<result.rows.length;i++){
		        var obj = {
		            "_id": result.rows[i].doc.id,
		            "expense": result.rows[i].doc.expense,
		            "amount": result.rows[i].doc.amount
		        }
		        $scope.itemsdbRemote.push(obj);
		        $scope.$apply();
		    }
		    
		}).catch(function(err) {
			    console.log(err);
		});
	}
	
	$scope.add = function(data){
		var timeStamp = String(new Date().getTime());
		var item = {
		        "_id": timeStamp,
		        "expense": data.expense,
		        "amount": data.amount
		};

		dbLocal.put(item).then(function (response) {
		    $scope.itemsdbLocal.push(item);   // Add to items array
		    //$scope.closeModal();      // Close the modal
		}).catch(function (err) {
		    console.log(err);
		});
		$scope.init()
		//$scope.init();
	};
	$scope.init()
}])

.factory('pouchdb', function() {
	return new PouchDB('ipouch14');
});
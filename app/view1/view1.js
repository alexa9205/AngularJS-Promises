'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ["$scope", "$q", "$http", "$timeout",
    function ($scope, $q, $http, $timeout) {

      $scope.sonChecksWeather = function () {
        var deferred = $q.defer();

        $timeout(function () {
          var possibleOutcome = ['Sunny', 'Rainy', 'Unexpected error'];
          var randomNumber = Math.floor(Math.random() * 2);
          var result = possibleOutcome[randomNumber];
          console.log('Son: The weather is ', result);

          if (result === 'Sunny' || result === 'Rainy') {
            deferred.resolve(result);
          } else {
            deferred.reject(new Error('I cannot tell how the weather will be'));
          }
        }, 2000);

        return deferred.promise;
      };

      $scope.sonSelectTransport = function () {
        var deferred = $q.defer();
        $timeout(function () {
          var possibleTransport = ['Car', 'Bicycle', 'Skateboard', 'No transport'];
          var randomNumber = Math.floor(Math.random() * 4);
          var result = possibleTransport[randomNumber];
          console.log('Son: The selected transport is ', result);

          if (result === 'Car' || result === 'Bicycle' || result === 'Skateboard') {
            deferred.resolve(result);
          } else {
            deferred.reject(new Error('I cannot decide on the mode of transport.'));
          }
        }, 5000);

        return deferred.promise;


      }


      $scope.checkFinances = function(){
        var deferred = $q.defer();

        $timeout(function() {
          var finances = Math.random() < 0.5 ? 'Good' : 'Bad' ;
          console.log('Son: The finances are ' + finances);
    
          if (finances === 'Good') {
            deferred.resolve(finances);
          } else {
            deferred.reject(new Error('Financial issues'));
          }
        }, 3000);
    
        return deferred.promise;
      }

      $scope.fatherWillDecide = function() {
        var transportPromise = $scope.sonSelectTransport();
        var weatherPromise = $scope.sonChecksWeather();
        var financesPromise = $scope.checkFinances();
    
        $q.all([transportPromise, weatherPromise, financesPromise])
          .then(function(results) {
            var transport = results[0];
            var weather = results[1];
            var finances = results[2];
    
            console.log('Father: We have decided based on the following factors:');
            console.log('Transport: ' + transport);
            console.log('Weather: ' + weather);
            console.log('Finances: ' + finances);
    
            if (transport === 'Car' && weather === 'Sunny' && finances === 'Good') {
              $scope.mensaje2 = 'Father: We will take the car and go on vacation, you deserve it!';
            } else if(transport === 'Car' && weather === 'Rainy' && finances === 'Good'){
              $scope.mensaje2 = 'Father: We will stay at home. I dont like this weather' ;
            } else if(transport === 'Car' && weather === 'Sunny' && finances === 'Bad' || transport === 'Car' && weather === 'Rainy' && finances === 'Bad'){
              $scope.mensaje2 = 'Father: We will stay at home. I dont have money' ;
            }else if((transport === 'Bicycle' || transport === 'Skateboard' ) && weather === 'Sunny' && (finances === 'Bad' || finances === 'Good')){
              $scope.mensaje2 = 'Father: Ok, your choice was' +transport+ ' '+' We can go for a ride in the park . ' ;
            }else{
              $scope.mensaje2 = "I don't feel like doing anything"
            }
          })
          .catch(function(error) {
            console.log('Error is', error);
          });
      };
    
      $scope.fatherWillDecide()

    }]);
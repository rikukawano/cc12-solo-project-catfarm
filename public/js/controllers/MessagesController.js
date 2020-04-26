/* global app, $ */
app.controller("MessagesController", [
  "$scope",
  "$http",
  function($scope, $http) {
    $scope.user = {};
    $scope.userCats = [];
    $scope.usernameRecieved = false;

    const getCats = function() {
      $http
        .get(`http://localhost:3000/api/cats/${$scope.user.id}`)
        .then((response) => {
          $scope.userCats = response.data;
        });
    };

    $scope.signIn = function(e) {
      const postData = { username: $("#username-input")[0].value };
      $http({
        method: "POST",
        url: "http://localhost:3000/api/users",
        data: postData,
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        $scope.usernameRecieved = true;
        $scope.user = response.data;
        getCats();
      });
    };

    const getUser = function() {
      $http
        .get(`http://localhost:3000/api/users/${$scope.user.username}`)
        .then((response) => {
          $scope.user = response.data;
        });
    };

    $scope.buyCat = function(id) {
      const postData = {
        cat_id: id,
        owner_id: $scope.user.id,
      };
      $http({
        method: "POST",
        url: `http://localhost:3000/api/cats`,
        data: postData,
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        $scope.userCats = response.data;
        getUser();
        getCats();
      });
    };

    $scope.sellCat = function(cat) {
      $http
        .delete(
          `http://localhost:3000/api/cats/${cat.id}/${cat.name}/${$scope.user.id}`
        )
        .then((response) => {
          $scope.userCats = response.data;
          getUser();
          getCats();
        });
    };
  },
]);

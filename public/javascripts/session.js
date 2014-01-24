function SessionCtrl($scope,$http){
	$scope.newSession = function(){
		//Send new session request to server
		$http.get('/rest/session/new').success(function(data) {
			$scope.session_id = data.session_id;
		});
		//Get session id from server, and populate a link field.
	}
}
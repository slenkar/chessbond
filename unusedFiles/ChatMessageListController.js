angular.module('HomepageModule').controller('ChatMessageListController', ['$scope', '$http','$window' ,'toastr','DateService', function($scope, $http,$window,toastr,DateService){
	$scope.TheID='';
$scope.WallPosts=[];

	$scope.getChatMessages=function(id,skip){
	if(skip === undefined) { skip = 0; }
	
	var room="/privateconversation/"+id
	
		io.socket.get("/subscribeToRoom",{roomName:room},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
	io.socket.on('WallPost', function (data)
			{
			console.log("recieved wall post socket");
		
			
			$scope.$apply(function(){
				if(data.replyto!='none')
				{
					console.log("recieved reply");
				for (x in $scope.WallPosts)
				{
				if($scope.WallPosts[x].id==data.replyto)
					{
						if(!$scope.WallPosts[x].Replies)
						{$scope.WallPosts[x].Replies=[];}
						$scope.WallPosts[x].Replies.push(data);}
				}
			}
			else
			{
					console.log("recieved not a reply");
				$scope.$apply(function(){
			$scope.WallPosts.unshift(data);
			});
			}
			});
			console.log(data);
			});
			
		io.socket.get('/wallpost?replyto=none&groupid='+id+'&limit=10&skip='+skip+'&sort=createdAt DESC',
			function (msgs) {
				//console.log(JSON.stringify(msgs));
				
				
				console.log("msgs.length "+msgs.length);
				$scope.$apply(function(){
				for (x in msgs)
				{
				$scope.WallPosts[x]=msgs[x];
				
				msgs[x].Age=DateService.phrasefordate(msgs[x].createdAt);//$scope.CalcAge(msgs[x].createdAt);
				
						
				}
			});
			
			});
	};
	
	
	$scope.WallPosts=$scope.WallPosts;
	
}]);

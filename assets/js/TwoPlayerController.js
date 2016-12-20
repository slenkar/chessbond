angular.module('HomepageModule').controller('TwoPlayerController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){
var board1 ;
var game;
$scope.Player1Namer="";
$scope.Player2Name="";
$scope.chatting=new Array();

$scope.BottomPlayerPic="";
$scope.TopPlayerPic="";
$scope.ShowOptions=true;

$scope.HideInject=true;

$scope.ChessGameObject={};
$scope.ChessGameObject2={};

$scope.PlayerOnBottom='White';
var squareClass = 'square-55d63';
  var squareToHighlight;
  boardEl = $('#board');
  
$scope.TopMinutes=0;
$scope.TopSeconds=0;

$scope.BottomMinutes=0;
$scope.BottomSeconds=0;

$scope.WhiteTime=((5*60)*1000);
$scope.BlackTime=((5*60)*1000);

$scope.WhiteTimeDisplay="string";
$scope.WhiteMinutes;
$scope.WhiteSeconds;
$scope.BlackTimeDisplay="string";
$scope.BlackMinutes;
$scope.BlackSeconds;
$PingStartTime=0;

$scope.capturedWhitepieces=[];

$scope.capturedBlackpieces=[];

$scope.WhiteInterval=0;
$scope.BlackInterval=0;

$scope.StartRightClock=function()
{
	
	if(game.turn()=='b')
	{
	$scope.StartBlackClock();	
	}
	if(game.turn()=='w')
	{
	$scope.StartWhiteClock();	
	}
	
}

$scope.StartWhiteClock=function()
	{
		$scope.BlackTime=((5*60)*1000);
		$scope.WhiteInterval=	setInterval(function (){
		if ($scope.WhiteTime>0)
		{
		$scope.WhiteTime-=121;
		}
		if ($scope.WhiteTime<0)
		{
			$scope.WhiteTime=0;
		}
		var bythousand=$scope.WhiteTime/1000;
		$scope.WhiteSeconds=parseInt(bythousand % 60);
		$scope.WhiteMinutes=parseInt((bythousand)/60);
		$scope.WhiteMilliseconds=parseInt($scope.WhiteTime % 1000);
		if ($scope.WhiteSeconds<10)
		{$scope.WhiteSeconds="0"+$scope.WhiteSeconds;}
		if($scope.PlayerOnBottom=='White')
		{
		$scope.$apply($scope.BottomMinutes=$scope.WhiteMinutes);	
		$scope.$apply($scope.BottomSeconds=$scope.WhiteSeconds);	
		$scope.$apply($scope.BottomMilliseconds=$scope.WhiteMilliseconds);
		}
		else
		{
		$scope.$apply($scope.TopMinutes=$scope.WhiteMinutes);	
		$scope.$apply($scope.TopSeconds=$scope.WhiteSeconds);	
		$scope.$apply($scope.TopMilliseconds=$scope.WhiteMilliseconds);	
		
		}
		
		
		
		
		},121);	
		
	};
$scope.StartBlackClock=function()
	{
		$scope.BlackTime=((5*60)*1000);
	$scope.BlackInterval=setInterval(function (){
		
		if ($scope.BlackTime>0)
		{
		$scope.BlackTime-=121;
		}
		if ($scope.BlackTime<0)
		{
			$scope.BlackTime=0;
		}
		var bythousand=$scope.BlackTime/1000;
		$scope.BlackSeconds=parseInt(bythousand % 60);
		$scope.BlackMinutes=parseInt((bythousand)/60);
		$scope.BlackMilliseconds=parseInt($scope.BlackTime % 1000);
		if ($scope.BlackSeconds<10)
		{$scope.BlackSeconds="0"+$scope.BlackSeconds;}
		if($scope.PlayerOnBottom=='Black')
		{
		$scope.$apply($scope.BottomMinutes=$scope.BlackMinutes);
			
		$scope.$apply($scope.BottomSeconds=$scope.BlackSeconds);	
		$scope.$apply($scope.BottomMilliseconds=$scope.BlackMilliseconds);
		}
		else
		{
		$scope.$apply($scope.TopMinutes=$scope.BlackMinutes);	
		$scope.$apply($scope.TopSeconds=$scope.BlackSeconds);	
		$scope.$apply($scope.TopMilliseconds=$scope.BlackMilliseconds);	
		
		}
		},121);	
		
	};
  $scope.piecethemes = [
      'A','B','C','D','E','F','G','H'
    ];
$scope.BellSound= new Audio('alert.mp3');
$scope.MoveSound=new Audio('move.mp3');
$scope.CheckMateSound=new Audio("checkmate.mp3");

$scope.pic1height=30;
$scope.pic1coordy=48;
$scope.pic1coordx=56;

$scope.smallimage1=function()
{
$scope.pic1height=30; $scope.pic1coordx=56; $scope.pic1coordy=48;	
}
$scope.bigimage1=function()
{
$scope.pic1height=200; $scope.pic1coordx=0;	$scope.pic1coordy=-60;
}


$scope.pic2height=25;
$scope.pic2coordy=50;
$scope.pic2coordx=60;

$scope.smallimage2=function()
{
$scope.pic2height=25; $scope.pic2coordx=60; $scope.pic2coordy=50;	
}
$scope.bigimage2=function()
{
$scope.pic2height=200; $scope.pic2coordx=0;	$scope.pic2coordy=0;
}

//document.addEventListener("visibilitychange", function() {
  //console.log( document.visibilityState );
 // if (document.visibilityState=='visible')
 // {console.log('document is visible');}
//});
    $scope.PlayBell=function()
    {
	$scope.BellSound.play();
	};
	$scope.PlayMove=function()
    {
	$scope.MoveSound.play();
	};
	$scope.PlayCheckMate=function()
    {
	$scope.CheckMateSound.play();
	};
	

	$scope.getuser=function(MyID)
	{
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.User=sailsResponse.data;
			$scope.setBoard(MyID);
			
      		}
			)	
		
	};
	$scope.DoPingInterval=function()
	{
		
	setInterval(function (){
		$scope.DoPing();
	},20000);
	}
	$scope.DoPing=function()
	{
	$PingStartTime=Date.now()
		io.socket.put('/pingtest',{
				
					  }  
				  
		,function(resData,jwres)
			{
				//console.log(resData);
				//console.log(jwres);
				//console.log("Ping:"+(Date.now()-$PingStartTime));
				$scope.PingDisplay=(Date.now()-$PingStartTime);
				//console.log(Date.now());
				return (Date.now()-$PingStartTime)
				}
			);
			
	};
	$scope.RecordGameResult=function(MyID,Player1,Player2,Player1Name,Player2Name,gameid,game)
	{
		var result="";
    if (game.in_checkmate())
    {
	if (game.turn()=='w')
		{
c
			toastr.info("black won");
			console.log("I am "+MyID+" player1 "+Player1);
			console.log("I am "+MyID+" player2 "+Player2);
			result=Player2Name+" beat "+Player1Name;
			if (MyID==Player2)
			{
			
				io.socket.put('/RecordGameResult',{
				winner:Player2,
				loser:Player1,
				GameID:gameid
					  }  
				  
				,function(resData,jwres)
			{
				console.log(resData);
				console.log(jwres);
				}
			);
			
			}
			}
	if (game.turn()=='b')
		{
			
			toastr.info("white won");
			console.log("I am "+MyID+" player1 "+Player1Name);
			console.log("I am "+MyID+" player2 "+Player2Name);
			result=Player1Name+" beat "+Player2Name;
			if (MyID==Player1)
			{
			io.socket.put('/RecordGameResult',{
				winner:Player1,
				loser:Player2,
				GameID:gameid
					  }  
				  
				,function(resData,jwres)
			{
				console.log(resData);
				console.log(jwres);
				}
			);
			
			}
			}
	}
    
    return result;
	
	};
	
	$scope.Showcapturedpiece=function(cap,colour)
	{
	if (cap)
	{
		var str=cap;
		var pieceUpper=str.toUpperCase();
		if (colour=='w')
		{colour='b';}
		else
		{colour='w';}
		if (colour=='w')
		{
		$scope.capturedWhitepieces.push(pieceUpper);
		if($scope.ChessGameObject.capturedWhitepieces)
		{
		$scope.ChessGameObject.capturedWhitepieces+=","+(pieceUpper);
		console.log("adding white piece to captured");
		}
		else
		{
		$scope.ChessGameObject.capturedWhitepieces=(pieceUpper);
		}
		}
		else
		{
		$scope.capturedBlackpieces.push(pieceUpper);
		if($scope.ChessGameObject.capturedBlackpieces)
		{
		$scope.ChessGameObject.capturedBlackpieces+=","+(pieceUpper);
		}
		else
		{
		$scope.ChessGameObject.capturedBlackpieces=(pieceUpper);
		}
		}
	}
	};
	
	$scope.ChangePreference=function(prefid,me,newpref)
	{
		
			io.socket.put('/user/'+me+"?"+prefid+"="+newpref,{
				
					  }  
				  
				,function(resData,jwres)
			{
				console.log(resData);
				console.log(jwres);
				}
			);
     
		
	}
	$scope.PrefSelectChanged=function(pref,me,func)
	{
		$scope.ChangePreference(pref,me,$scope.User[pref]);
		console.log("changed "+pref+" to "+JSON.stringify($scope.User[pref]));
		if(func){
		func(me);}
	}
	$scope.PrefToggleButtonClicked=function(pref,me,state1,state2)
	{
	if ($scope.User[pref]==state1)	
	{
	$scope.User[pref]=state2;
	$scope.ChangePreference(pref,me,state2);
	}
	else
	{
	$scope.User[pref]=state1;
	$scope.ChangePreference(pref,me,state1);
	}
	};
	
    
	// set-up loginForm loading state
	
	document.head = document.head || document.getElementsByTagName('head')[0];
	io.socket.on('disconnect',function(data){
	console.log("DISCONNECT DETECTED!!!!");
	});
	io.socket.on('timeevent',function(data){
		//toastr.success(data.data.message);
		console.log(" timevent "+JSON.stringify(data));
	});
	io.socket.on('message', function (data){
		if (document.visibilityState=='hidden')
			{
			if($scope.User['SoundEnabled']=='Sound Enabled')
			{
			$scope.PlayBell();
			}
			$scope.changeFavicon('http://www.chessbond.com/favicon2.ico');
			console.log('recieved chat message'+document.visibilityState);
			}
			console.log(document.visibilityState);
				var txtmsg = { talker:data.talker,msg:data.greeting};
		
	$scope.$apply($scope.chatting.push(txtmsg));
				
			$("#chatdiv").scrollTop($("#chatdiv")[0].scrollHeight);
			
			});
	io.socket.on('ELOAdjustments',function(data){
	$scope.ChessGameObject2=data;
	
	});
	 io.socket.on('chessgamemove', function (data){
		console.log("recieved chess game move"+JSON.stringify(data));
		if (document.visibilityState=='hidden')
				{  $scope.changeFavicon('http://www.chessbond.com/favicon2.ico');
					}
			if($scope.User)
			{		
			if($scope.User.SoundEnabled=='Sound Enabled')
			{
			$scope.PlayMove();
			}
			}

  			$http.get('/chessgame?id='+GameID)
		.then(function (latest) {
		   
		   $scope.ChessGameObject=latest.data;
		   console.log(latest.data);
		   if ($scope.ChessGameObject2.id)
		   { 
			   console.log("object2 "+JSON.stringify($scope.ChessGameObject2));
			  $scope.ChessGameObject= $scope.ChessGameObject2;
		  }
		//board1.position(gameRecordnow .fen);
		//.if(game.load(gameRecordnow .fen)==false)
		//{
		//alert('couldnt load game');
	//	}
	console.log("last move"+$scope.ChessGameObject.lastmove);
	var modified=($scope.ChessGameObject.lastmove.substr(0, 2) + "-" + $scope.ChessGameObject.lastmove.substr(2));
	console.log("with -"+modified);
	console.log("from "+$scope.ChessGameObject.lastmove.substr(0, 2)+"-to-"+$scope.ChessGameObject.lastmove.substr(2, 5)+"-");
		 var move =game.move({ from: $scope.ChessGameObject.lastmove.substr(0, 2), to: $scope.ChessGameObject.lastmove.substr(2, 5) });
		if (move!=null){
		console.log("show captured piece");
			$scope.Showcapturedpiece(move.captured,move.color);
			
			if (game.turn()=='b')
			{
			clearInterval($scope.WhiteInterval);
			clearInterval($scope.BlackInterval);
			$scope.StartBlackClock();
			}
			else
			{
			clearInterval($scope.WhiteInterval);
			clearInterval($scope.BlackInterval);
			$scope.StartWhiteClock();
			}
			
			
		console.log("move returned from game "+JSON.stringify(move));
		board1.move(modified);
		var square=   boardEl.find('.square-' + move.to);
		var position =square .position();
		$( "img[id='highlight']" ).detach();
		square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
		 square.each(function( index ) {
		console.log( index + ": " + $( this ).text() );
		});
		 square=   boardEl.find('.square-' + move.from);
		square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
		
			

			 square=   $("b[id='lastpgn']");
			$( "img[id='pgnhighlight']" ).detach();
			  square.append("<img id='pgnhighlight' style='position:absolute;height:"+square.height()+"px;' src='/images/pgnhighlight.png'>");
					
		
		updateTurnTakerLabel(game);
		console.log(game.ascii());
		$scope.Moves=game.pgn().split(".");
		
		if (game.fen()!=board1.fen())
		{
			board1.position(game.fen());
		}
		
		}
		else
		{
			console.log("move is null updating game and board with");
		board1.position($scope.ChessGameObject.fen);
		//game.load(gameRecordnow.fen);
		console.log("after update "+game.ascii());
		}
		if (game.in_checkmate())
		{$scope.PlayCheckMate();
			//toastr.success("CheckMate!");
			}
		});
		
	});

$scope.changeFavicon=function (src) {
 var link = document.createElement('link'),
    oldLink = document.getElementById('dynamic-favicon');
 link.id = 'dynamic-favicon';
 link.rel = 'shortcut icon';
 link.href = src;
 if (oldLink) {
  document.head.removeChild(oldLink);
 }
 document.head.appendChild(link);
};
	
	
	function updatePlayersLabel(game)
	{
		console.log("hello");
		$scope.Player1Namer=$scope.ChessGameObject.Player1Name;
		$scope.Player2Name=$scope.ChessGameObject.Player2Name;
		console.log("scopep2"+$scope.Player2Name);	
	}
	
	function updateTurnTakerLabel(game)
	{
		if (game.turn()=='w')
		{
		$scope.TurnTaker=$scope.ChessGameObject.Player1Name;
		}
		else
		{
		$scope.TurnTaker=$scope.ChessGameObject.Player2Name;
		
		}
		
		
		$scope.Player1Namer=$scope.ChessGameObject.Player1Name;
		$scope.Player2Name=$scope.ChessGameObject.Player2Name;
	//console.log("scopep2"+$scope.Player2Name);	
		
		}
		
		function usersTurn(game,me)
		{
		if (game.turn()=='w')
		{
		if ($scope.ChessGameObject.Player1==me)
		{
			console.log('it is your turn');
			return true;}
		else
		{
			console.log('its '+$scope.ChessGameObject.Player1+'s turn'+me);
			return false;}
		}
		else
		{
		if ($scope.ChessGameObject.Player2==me)
		{
			console.log('it is your turn');
			return true;}
		else
		{
			console.log('its '+$scope.ChessGameObject.Player2+'s turn'+me);
		
		return false;}
		
		}
		}
		
		
	$scope.getchatmessages=function(){
		
	  $http.get('/chatmessage?room='+GameID+'&limit=30000', {
      room: GameID
    })
    .then(function onSuccess (dat){
      // Refresh the page now that we've been logged in.
      //$scope.$apply(function() {
      console.log("joined games reply"+JSON.stringify(dat.data));
		for (m in dat.data)
	{console.log("joined games reply2"+JSON.stringify(dat.data[m]));
		
		var txtmsg = { talker:dat.data[m]['talker']   ,   // property_# may be an identifier...
            msg:dat.data[m]['msg']};
		
			
	$scope.chatting.push(txtmsg);
	}
	//});
	
	$("#chatdiv").scrollTop($("#chatdiv")[0].scrollHeight);
    })
    .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //
       // toastr.error('Cant find joined games, not logged in.', 'Error', {
          
        //});
        return;
      }

				toastr.error('An unexpected error occurred trying to find joined games.', 'Error', {
					
				});
				return;

    })
    .finally(function eitherWay(){
      
    });
    
}

		
		$scope.chatMessage=function(usrName)
		{
			$http.post("/chatmsg",{talker: $scope.User.name,roomName:GameID,message:$scope.chatInput})
			.then(function onSuccess (){
			$scope.chatInput = null;
			}
			);
			
			
			
		};
		$scope.countryTofilename=function(country)
{
	return country.replace(/ /gi, "_");
}
		
		function ShowPlayersAvatars()
		{
			var idtoget;
			var picurl;
			
			
			console.log("player1"+$scope.ChessGameObject.Player1);
			console.log("player2"+$scope.ChessGameObject.Player2);
			
			
			
			
			$http.get('/user?id='+$scope.ChessGameObject.Player1).then(function
			(res)
			{
				console.log(JSON.stringify(res.data));
				
				var picurl=(res.data.picture);
				var flagurl="/images/flags/"+$scope.countryTofilename(res.data.Country)+".png";
				
				console.log("flagurl "+flagurl);
				console.log("$scope.PlayerOnBottom"+$scope.PlayerOnBottom);
			if ($scope.PlayerOnBottom=='White')
			{
			$scope.BottomPlayerPic=picurl;
			$scope.BottomPlayerFlag=flagurl;	
			
			}
			else
			{
			$scope.TopPlayerPic=picurl;
			$scope.TopPlayerFlag=flagurl;	
		
			}
			
			});
			
			$http.get('/user?id='+$scope.ChessGameObject.Player2).then(function
			(res)
			{
				var picurl=(res.data.picture);
		
				var flagurl="/images/flags/"+$scope.countryTofilename(res.data.Country)+".png";
				
				
			
			if ($scope.PlayerOnBottom=='White')
			{
			$scope.TopPlayerPic=picurl;
			$scope.TopPlayerFlag=flagurl;	
			}
			else
			{
			$scope.BottomPlayerPic=picurl;
			$scope.BottomPlayerFlag=flagurl;	
			}
			
			});
			
		}

		
		
	$scope.joinRoom=function (usr)
		{
			
			io.socket.get("/subscribeToRoom",{roomName:GameID},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
		$http.get('/user?id='+usr)
						.then(function (res) {
							$scope.User = res.data;
							
						});
	
		};
		
							
		$scope.ShowCapturedPieces=function()
		{
			if($scope.ChessGameObject.capturedWhitepieces)
			{
			$scope.capturedWhitepieces=$scope.ChessGameObject.capturedWhitepieces.split(",");
			}
			
			if($scope.ChessGameObject.capturedBlackpieces)
			{
				
			$scope.capturedBlackpieces=$scope.ChessGameObject.capturedBlackpieces.split(",");
			console.log("Captured blacks:"+$scope.ChessGameObject.capturedBlackpieces);
			}
		};
		
		$scope.resetBoard=function(me)
		{
						$http.get('/chessgame?id='+GameID)
						.then(function (res) {
							
							$scope.ChessGameObject=res.data;
							
							ShowPlayersAvatars();
							
							var onSnapEnd = function() {
									//board1.position(game.fen());
								/*	console.log("on snap end");
									console.log(game.ascii());
									console.log(gameRecord.fen);
									console.log(game.fen());
									if (gameRecord.fen)
									{
									if (game.fen()!=gameRecord.fen)
									{
									console.log("game is different to gameRecord");
									console.log("game"+JSON.stringify(game));	
								//	console.log("move"+JSON.stringify(move));
									console.log("gameRecord"+JSON.stringify(gameRecord));
										io.socket.put('/Chessgame/'+gameRecord.id,{
										  fen: game.fen(),
										  pgn:game.pgn({max_width: 5, newline_char: '-' }),
										  lastmove:move.from+move.to
										  }  
										  
										,function(resData,jwres)
									{
										io.socket.put('/chessgamemove',{GameID:gameRecord.id},function(resData,jwres)
										{
										
										});
										}
									);
									
									}
									
									
									}
									*/
								};
								var onDrop = function(source, target) {
  
							if (usersTurn(game,me)===false)
						{ 
							toastr.warning("It's not your turn");
							return 'snapback';}
						// see if the move is legal
						var move = game.move({
							from: source,
							to: target,
							promotion: 'q' // NOTE: always promote to a queen for example simplicity
						  });

					  // illegal move
					  
					  if (move === null || game.in_draw()){
						  if (game.game_over())
							{
						  toastr.warning("The game is over");
						 }
						  if (game.in_check())
							{
						  toastr.warning("You are in check");
						 }
	 
						 console.log('gameover?'+game.game_over());
						  console.log('in check?'+game.in_check());
						  console.log('in checkmate?'+game.in_checkmate());
						  console.log('in draw?'+game.in_draw());
						   
						  
						   return 'snapback';
						   }
						   console.log("adding one to Move"+$scope.ChessGameObject.Move);
							$scope.ChessGameObject.Move+=1;
						 console.log("before show captured piece whites:"+$scope.ChessGameObject.capturedWhitepieces);
							console.log("before show captured piece Blacks:"+$scope.ChessGameObject.capturedBlackpieces);

						  $scope.Showcapturedpiece(move.captured,move.color);
						   console.log("added one to Move"+$scope.ChessGameObject.Move);
							
							  if (game.in_draw())
								{
							  toastr.success("It's a draw");
							 }
							  if (game.in_checkmate())
								{
							  toastr.success("Checkmate!");
							  console.log("checkmate");
							  $scope.ChessGameObject.Result=$scope.RecordGameResult(me,$scope.ChessGameObject.Player1,$scope.ChessGameObject.Player2,$scope.ChessGameObject.Player1Name,$scope.ChessGameObject.Player2Name,GameID,game);
							  console.log("result after record result: "+$scope.ChessGameObject.Result);
							 }
	 
							console.log("move from ondrop "+JSON.stringify(move));
							var square=   boardEl.find('.square-' + move.to);
							var position =square .position();
							 $( "img[id='highlight']" ).detach();
						  square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
					
							 square=   $("b[id='lastpgn']");
							$( "img[id='pgnhighlight']" ).detach();
						  square.append("<img id='pgnhighlight' style='position:absolute;height:"+square.height()+"px;' src='/images/pgnhighlight.png'>");
					
						  
						  
						  square=   boardEl.find('.square-' + move.from);
							square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
		
						  $scope.Moves=game.pgn().split(".");
					  //console.log("left"+position.left);
					  //console.log("top"+position.top);
					  //console.log("html"+square.html());
					  //console.log("height"+square.height());
					 // console.log("<img style='position:absolute;height:"+square.height()+"px;top:"+position.top+"px;left:"+position.left+"px' src='/images/circle.png'>");
					  //square.append("<img style='position:relative;height:"+square.height()+"px;top:"+position.top+"px;left:"+position.left+"px' src='/images/circle.png'>");
					
					  console.log('move'+JSON.stringify(move));
					console.log("result: "+$scope.ChessGameObject.Result);
					updateStatus(game,move);
};

function updateStatus(game,move)
{
	console.log("update status");
$scope.ChessGameObject.fen=game.fen();
$scope.ChessGameObject.lastmove=move.from+move.to;

if (game.turn()=='b')
{
	console.log("$scope.WhiteInterval "+$scope.WhiteInterval);
	clearInterval($scope.WhiteInterval);
	clearInterval($scope.BlackInterval);
	$scope.StartBlackClock();
	}
	else
	{
	clearInterval($scope.WhiteInterval);
	clearInterval($scope.BlackInterval);
	$scope.StartWhiteClock();
		
		
	}

updateTurnTakerLabel(game);
updatePlayersLabel(game);
//game.load(gameRecord.fen);

console.log("put chessgame result is :"+$scope.ChessGameObject.Result);
console.log("put chessgame move is :"+$scope.ChessGameObject.Move);
console.log("put chessgame captured whites:"+$scope.ChessGameObject.capturedWhitepieces);
console.log("put chessgame captured Blacks:"+$scope.ChessGameObject.capturedBlackpieces);

io.socket.put('/Chessgame/'+$scope.ChessGameObject.id,{
      fen: game.fen(),
      pgn:game.pgn({max_width: 5, newline_char: '-' }),
      lastmove:move.from+move.to,
      Move:$scope.ChessGameObject.Move,
      Result:$scope.ChessGameObject.Result,
	  capturedWhitepieces:$scope.ChessGameObject.capturedWhitepieces,
      capturedBlackpieces:$scope.ChessGameObject.capturedBlackpieces
      }  
    ,function(resData,jwres)
	{
	
	io.socket.put('/chessgamemove',{GameID:$scope.ChessGameObject.id,ColorToMove:game.turn()},function(resData,jwres)
	{
	console.log(jwres);
	});
	
	}
);
console.log('about to putsocket');




}
//console.log(JSON.stringify($scope.MyPieceTheme));
//console.log(JSON.stringify($scope.MyPieceTheme[0]['name']));

 board1 = ChessBoard('board',{draggable: true,onDrop: onDrop,onSnapEnd:onSnapEnd,pieceTheme: 'img/chesspieces/'+$scope.User.ChessPieceTheme+'/{piece}.png'} );
 game = new Chess();

 if ($scope.ChessGameObject.Player2==me)
	{board1.flip();
		$scope.PlayerOnBottom='Black';
		console.log("black is on bottom ");
		}

	board1.start();
	
		if ($scope.ChessGameObject.fen)
		{
		board1.position($scope.ChessGameObject.fen);
		console.log("pgn "+$scope.ChessGameObject.pgn)
		$scope.Moves=$scope.ChessGameObject.pgn.split(".");
		console.log($scope.Moves);
		if(game.load_pgn($scope.ChessGameObject.pgn)===false)
		{
		alert('couldnt load game');
		}
		$scope.ShowCapturedPieces();
		$scope.StartRightClock();
		console.log("last move"+$scope.ChessGameObject.lastmove);
		
		var square=   boardEl.find('.square-' + $scope.ChessGameObject.lastmove.substr(2, 5));
	var position =square .position();
	 $( "img[id='highlight']").detach();
  square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
   square=   boardEl.find('.square-' + $scope.ChessGameObject.lastmove.substr(0, 2));
		square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
		
			 square=   $("b[id='lastpgn']");
							$( "img[id='pgnhighlight']" ).detach();
						  square.append("<img id='pgnhighlight' style='position:absolute;height:"+square.height()+"px;' src='/images/pgnhighlight.png'>");
					
		
		}
		updateTurnTakerLabel(game);
		
		
		});
			};
	$scope.setBoard=function (me)
		{
			$http.get('/user?id='+me).then(function
			(res)
			{//res.data.JSONpref=null;
			
	
				
				
				
	
			
			
			
			
$scope.resetBoard(me);
		
		
	});
	
	};
	
   

		
	 


	   /* 
     
	 setInterval(function ()
		{
        if (announced_game_over) {
            return;
        }
        }
        )
        
        if (chess.game_over())
        {
        if (chess.game_checkmate())
        {
        if (chess.NotPlayersTurn())
        {
            announced_game_over = true;
           toastr.success("You Won!");
           $http.put('/updatelevelbeaten', {
			DifficultyLevelBeaten:$scope.LevelForm.level,
			})
			.then(function onSuccess (){
			//Refresh the page now that we've been logged in.
			toastr.success('Your victory has been recorded in your profile');
			})   
            .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 500) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //
        toastr.error('Log in to record your victories.', 'Error', {
          closeButton: true
        });
        return;
      }
		
				toastr.error('An unexpected error occurred, please try again.', 'Error', {
					closeButton: true
				});
				return;

    })
           
        }
        }
		}
        
    }, 1000);
     
    
	$scope.injectfen=function (){
	
	
	chess.injectboard('3Q1R2/8/5R2/P7/6p1/2K1k1P1/P6B/8 w - - 0 55');
	chess.injectgame('3Q1R2/8/5R2/P7/6p1/2K1k1P1/P6B/8 w - - 0 55');
	}
	
	
	$scope.PressedGoButton=function(){
	$scope.hideboard=false;
	chess=init($scope.LevelForm.level);
	$scope.hidedifficulty=true;
	toastr.success("Playing at difficulty level "+$scope.LevelForm.level);
	
	};
	 */
}]
 )
 ;
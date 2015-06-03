function addPlayer(player){
	if(!(playerList.hasOwnProperty(player))){
		var name = randomName();
		var avatar = randomAvatar();
		displayPlayer(name,avatar);
		playerList[player] = {};
		playerList[player].name = name;
		playerList[player].img = avatar;
		playerList[player].status = 'waiting';
		console.log(playerList);
	}
	
}

function p1Connect(){
	console.log("p1Connect");
	
	addPlayer("player1");	
	
}

function p2Connect(){
	console.log("p2Connect");
	addPlayer("player2");
}

function p3Connect(){
	console.log("p3Connect");
	addPlayer("player3");
}

function p1Ready(){
	console.log("p1Ready");
	if($('#player1')){
		$("#player1").append("Ready!");
		playerList['player1'].status = 'ready';
		checkForAllReady();
	}
}

function p2Ready(){
	console.log("p2Ready");
	if($('#player2')){
		$("#player2").append("Ready!");
		playerList['player2'].status = 'ready';
		checkForAllReady();
	}
}

function p3Ready(){
	console.log("p3Ready");
	if($('#player3')){
		$("#player3").append("Ready!");
		playerList['player3'].status = 'ready';
		checkForAllReady();
	}
}

function p1Answer(){
	console.log("p1Answer");
	addCard();
	guesses['player1'] = {};
	guesses['player1'].guess = randomGuess();
	showGuesses();
}

function p2Answer(){
	console.log("p2Answer");
	addCard();
	guesses['player2'] = {};
	guesses['player2'].guess = randomGuess();
	showGuesses();
}

function p3Answer(){
	console.log("p3Answer");
	addCard();
	guesses['player3'] = {};
	guesses['player3'].guess = randomGuess();
	showGuesses();
}

function p1Bet(){
	console.log("p1Bet");
}

function p2Bet(){
	console.log("p2Bet");
}

function p3Bet(){
	console.log("p3Bet");
}

function randomAvatar(){
	var randomNumber = Math.floor((Math.random() * 12) + 1);
	return "images/" + randomNumber + ".jpg";
}

function randomName(){
	var names = ["Ryan","Leah","Samantha","Connor","Paul","Shirlene","Kellianne","Heidi","Amy","Matthew","Terry","Laraine","Shane","Kaeli"];
		var randomNumber = Math.floor((Math.random() * 12));
	return names[randomNumber];
}

function randomGuess(){
	return	Math.floor((Math.random() * 1000));
}

function checkForAllReady(){
	if(numPlayers < 3){
		return;
	}
	for (player in playerList){
		if(playerList[player].status != 'ready'){
			return;	
		}		
	}
	beginNewRound();
}

function showGuesses(){
	console.log("checking");
	console.log(Object.keys(guesses).length);
	console.log(Object.keys(playerList).length);
	var numGuesses = Object.keys(guesses).length;
	for (i=1;i<numGuesses+1;i++){
		document.getElementById("card"+i).style.visibility = "visible";
	}
	if(Object.keys(guesses).length == Object.keys(playerList).length){
		clearSweetAlert();
		sortPlayers();
	}
}

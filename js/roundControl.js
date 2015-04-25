// JavaScript Document



function onReadyReceived(){
	//check if everyone is ready
	//when everyone is ready, trigger onAllReady
	log("onReadyReceived");
};

function onAllReady(){
	
		//when all ready, begin the round
		
		//Begin question animation
		log("onAllReady");
	
};

function onQuestionAnimationEnd(){
	
	//Broadcast to all devices the question and trigger the number pad
	//begin waiting for Guesses
	log("onQuestionAnimationEnd");
	
};

function onGuessReceived(){
	//place new card on screen with user color
	//Check to see if all senders have sent Guesses, if so, trigger onAllGuessesSubmitted
	log("onGuessReceived");
	
};

function onAllGuessesSubmitted(){
	//begin animation to show Guesses
	log("onAllGuessesSubmitted");
	
};

function onGuessAnimationEnd(){
	

	//broadcast message to all devices with Guesses and betting screen
	//wait for all bets to be placed
	log("onGuessAnimationEnd");
	
};

function onBetPlaced(){
	//check if all bets placed, if so, trigger onAllBetsPlaced
	log("onBetPlaced");
	
};

function onAllBetsPlaced(){
	//begin Animation to show correct Guesses, clear cards, update scores, and clear board
	log("onAllBetsPlaced");
};

function onAnswerAnimationEnd(){
	//broadcast to all devices to indicate they are ready for the next round
	//begin waiting for ready responses
	log("onAnswerAnimationEnd");
};





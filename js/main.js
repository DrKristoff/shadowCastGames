console.log('This would be the main JS file.');


//variables
var numPlayers = 0;
var maxNumPlayers = 6;
var numCards = 0;
var numRounds = 0;
var totalRounds = 4;

var testPlayer = 'Ryan';

var guesses = {};

var questionString = "";

var playerList = {};

//template HTML
var defaultProfileImage = 'images/default-profile.png';

var playerTemplateHTML = '<div id="%PLAYER%" class="col-md-2 col-sm-2 col-lg-2 col-xl-2 img-responsive">' +
      						'<img src="%IMG%" width="100" height="100" alt=""/>' +
			      		    '<h3>%PLAYERNAME%</h3>'+
      			  		'</div>';

var popupTemplateHTML = '<div class="examplePopup">' +
			      		    '<h3>%PLAYERNAME%</h3>'+
      			  		'</div>';
						
var questionTemplateHTML = '';

var cardTemplateHTML = '<div id="card%CONTENT%"class="card">'+
						'</div>';
						
var cardFrontTemplateHTML = '<div class="front col-md-2 col-sm-2 col-lg-2 col-xl-2">FRONT</<div>';

var cardBackTemplateHTML = '<div class="back col-md-2 col-sm-2 col-lg-2 col-xl-2">BACK</<div>';



//button functions
function showWinner(){
	displayPopup("You are the Winner!",2000,1,1);
}

function displayQuestion(){
	swal({title: "Question",text: "How many bla bla bla?"});
	$('.sweet-alert').find('.sa-button-container').remove();
}

function finalRound(){
	displayPopup("Final Round!",2000,1,1);
}

function answerSubmit(){
	
	for (i = 0; i < 6; i++) {
		addCard();
		console.log("added");	
	}
	
	//$el.baraja();

}

function gameOver(){
	displayPopup("Game Over!",2000,1,1);
}

function sortPlayers(){
	setTimeout(function(){
		$(".card").flip(true);
	}, 500);
	
	
}

function addTestPlayer(){
	displayPlayer(testPlayer, returnRandomImage());
}


//functions
function displayPlayer(playerName, imgURL){
	if(numPlayers == maxNumPlayers){
		console.log("Max players reached");
	return;	
	}
	numPlayers = numPlayers + 1;
	var playerString = "player" + numPlayers;
	
	var playerHTML	= playerTemplateHTML.replace("%PLAYER%",playerString);
	var playerHTML	= playerHTML.replace("%PLAYERNAME%",playerName);
	var playerHTML	= playerHTML.replace("%IMG%",imgURL);
	
	$('.playerContainer').append(playerHTML);
	//$('.img1').css({ 'height': '10px', 'width': '10px' });
}

function clearSweetAlert(timeout){
	
	setTimeout(function(){
	//$('body').removeClass("stop-scrolling");
	swal.close();
	$('body').addClass("stop-scrolling");
	setTimeout(function(){
    	$('.sweet-overlay').remove();
		$('.sweet-alert').remove();
	}, 100);
	},timeout);
}

function addCard(){
	numCards = numCards + 1;
	//var cardHTML = cardTemplateHTML.replace("%CONTENT%",numCards);
//	$('#cardsContainer').append(cardHTML);
//	$("#card"+numCards).append(cardFrontTemplateHTML);
//	$("#card"+numCards).append(cardBackTemplateHTML);
//	$("#card"+numCards).flip();
	
}

function displayPopup(textString, timeout, length, width){
	swal({title: textString,text: ""});
	$('.sweet-alert').find('.sa-button-container').remove();
	
	clearSweetAlert(timeout);
	
}

function returnRandomImage(){
	var randInt = Math.floor((Math.random() * 10) + 1);
	return "images/" + randInt + ".jpg";	
}

function spreadCards() {


}

function beginNewRound(){
	if(numRounds > totalRounds){
		gameOver();
		return;
	}
	
	guesses = {};
	displayPopup("NEXT ROUND!",2000,1,1);
	setTimeout(function(){
		displayQuestion();	
		}, 2500);
	
	
}

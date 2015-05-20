console.log('This would be the main JS file.');


//variables
var numPlayers = 0;
var numCards = 0;

var testPlayer = 'Ryan';

var guessObject = {};

var questionString = "";

//var $el = $( '#baraja-el' );
//var baraja = $el.baraja();




//template HTML
var defaultProfileImage = 'images/default-profile.png';

var playerTemplateHTML = '<div class="col-md-2 col-sm-2 col-lg-2 col-xl-2 img-responsive">' +
      						'<img id="%PLAYER%" src="%IMG%" width="100" height="100" alt=""/>' +
			      		    '<h3>%PLAYERNAME%</h3>'+
      			  		'</div>';

var popupTemplateHTML = '<div class="examplePopup">' +
			      		    '<h3>%PLAYERNAME%</h3>'+
      			  		'</div>';
						
var questionTemplateHTML = '';

var cardTemplateHTML = '<li class="roundedCorners col-md-2 col-sm-2 col-lg-2 col-xl-2 img-responsive">%CONTENT%'+
						'<img src="images/3.jpg" width="160" height="120" alt="">'+
						'</li>';




//button functions
function showWinner(){
	displayPopup("You are the Winner!",2000,1,1);
}

function newRound(){
	displayPopup("NEXT ROUND!",2000,1,1);
}

function displayQuestion(){
	displayPopup("Question:  How many bla bla bla?",2000,1,1);
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
	$('#cardsContainer').mixItUp('sort', 'name:asc');	
}

function addTestPlayer(){
	console.log('TEST');
	addPlayer(testPlayer, returnRandomImage());
}


//functions
function addPlayer(playerName, imgURL){
	console.log(playerName);
	console.log(imgURL);
	numPlayers = numPlayers + 1;
	var playerString = "Player " + numPlayers;
	
	var playerHTML	= playerTemplateHTML.replace("%PLAYER%",playerString);
	var playerHTML	= playerHTML.replace("%PLAYERNAME%",playerName);
	var playerHTML	= playerHTML.replace("%IMG%",imgURL);
	
	$('.playerContainer').append(playerHTML);
	//$('.img1').css({ 'height': '10px', 'width': '10px' });
}

function clearSweetAlert(timeout){
	
	setTimeout(function(){
	$('body').removeClass("stop-scrolling");
	swal.close();
	setTimeout(function(){
    	$('.sweet-overlay').remove();
		$('.sweet-alert').remove();
	}, 100);
	},timeout);
}

function addCard(){
	numCards = numCards + 1;
	var cardHTML = cardTemplateHTML.replace("%CONTENT%",numCards);
	$('#cardsContainer').append(cardHTML);
	//$el.baraja();
	//baraja.add($(cardHTML));
	
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

/*	console.log('trigger');
	baraja.fan({
		speed : 500,
		easing : 'ease-out',
		range : 0.01,
		translation: 750,
		direction : 'right',
		origin : { x : 0, y : 0, },
		center : true
	});
		
						
	baraja.next();*/


}

//addPlayer("Ryan D", "images/default-profile.png");
//addPlayer("Shane D", "images/default-profile.png");
//addPlayer("Leah D", "images/default-profile.png");
//addPlayer("Samantha", defaultProfileImage);


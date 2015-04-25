console.log('This would be the main JS file.');

var numPlayers = 0;

var defaultProfileImage = 'images/default-profile.png';

var playerTemplateHTML = '<div class="col-md-2 col-sm-2 col-lg-2 col-xl-2 img-responsive">' +
      						'<img id="%PLAYER%" src="%IMG%" width="200" height="200" alt=""/>' +
			      		    '<h3>%PLAYERNAME%</h3>'+
      			  		'</div>';

function addPlayer(playerName, imgURL){
	numPlayers = numPlayers + 1;
	var playerString = "Player " + numPlayers;
	
	var playerHTML	= playerTemplateHTML.replace("%PLAYER%",playerString);
	var playerHTML	= playerHTML.replace("%PLAYERNAME%",playerName);
	var playerHTML	= playerHTML.replace("%IMG%",imgURL);
	
	$('#playerDiv').append(playerHTML);
	
}

//addPlayer("Ryan D", "images/default-profile.png");
//addPlayer("Shane D", "images/default-profile.png");
//addPlayer("Leah D", "images/default-profile.png");
//addPlayer("Samantha", defaultProfileImage);


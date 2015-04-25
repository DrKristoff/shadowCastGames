// JavaScript Document

var app_id = "711281B8";

var namespace =   {
	"Default":"urn:x-cast:com.ls.cast.sample",
    "ReadyToBeginGame":	"urn:x-cast:readyToBeginGame",
    "Guess":  "urn:x-cast:guess",
    "Bet":	"urn:x-cast:bet",
    "ReadyToBeginNextRound":"readyToBeginNextRound"
  };
  
function log(str)
{
	console.log(str);

	//var newSpan = document.createElement("span");
	//var newContent = document.createTextNode(str);
	//newSpan.appendChild(newContent);

	//var root = document.getElementById("root");
	//root.appendChild(newSpan);
	//root.appendChild(document.createElement("br"));
}

function onChannelOpened(event)
{
	log("onChannelOpened. Total number of channels: " + window.castReceiverManager.getSenders().length);
	console.log(event);
	addPlayer(event.senderID,'images/default-profile.png');
}

function onChannelClosed(event)
{
	log("onChannelClosed. Total number of channels: " + window.castReceiverManager.getSenders().length);
	if (window.castReceiverManager.getSenders().length == 0) window.close();
}

function onError()
{
	log("onError");
}

function onMessage(event)
{
	var message = event.data;
	var senderId = event.senderId;
	//Determine Message Type
	switch(event.namespace){
		case nameSpace.ReadyToBeginGame:
			onReadyReceived();
			break;
		case nameSpace.Guess:
			onGuessReceived();
			break;
		case nameSpace.Bet:
			onBetPlaced();
			break;
		case nameSpace.ReadyToBeginNextRound:
			onReadyReceived();
			break;
		case nameSpace.Default:
			break;
		default:	
	}

	console.log(event);
	log("message from: " + senderId + " message: " + message);
}

function onLoad()
{
	//log("document loaded");

	window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

	window.castReceiverManager.onSenderConnected = onChannelOpened;
	window.castReceiverManager.onSenderDisconnected = onChannelClosed;

	window.customMessageBus = window.castReceiverManager.getCastMessageBus(namespace.Default);
	window.customMessageBus.onMessage = onMessage;


	window.castReceiverManager.start();

	//log("cast started");

	window.setInterval(onTimer, 2000);
}

function onTimer()
{
	broadcast("timer");
}

function broadcast(message)
{
	window.customMessageBus.broadcast(message);
}

window.addEventListener("load", onLoad);


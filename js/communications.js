// JavaScript Document

var app_id = "711281B8";
var namespace = "urn:x-cast:com.ls.cast.sample";

function log(str)
{
	console.log(str);

	var newSpan = document.createElement("span");
	var newContent = document.createTextNode(str);
	newSpan.appendChild(newContent);

	var root = document.getElementById("root");
	root.appendChild(newSpan);
	root.appendChild(document.createElement("br"));
}

function onChannelOpened(event)
{
	log("onChannelOpened. Total number of channels: " + window.castReceiverManager.getSenders().length);
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
	log("message from: " + senderId + " message: " + message);
}

function onLoad()
{
	//log("document loaded");

	window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

	window.castReceiverManager.onSenderConnected = onChannelOpened;
	window.castReceiverManager.onSenderDisconnected = onChannelClosed;

	window.customMessageBus = window.castReceiverManager.getCastMessageBus(namespace);
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
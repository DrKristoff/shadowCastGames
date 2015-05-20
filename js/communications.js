
// External namespace for cast specific javascript library
var cast = window.cast || {};

// Anonymous namespace***********************************************************************************
(function() {
  'use strict';
  
    var app_id = "896E2978";

	var numPlayers = 0;

  BetOnIt.PROTOCOL = "urn:x-cast:com.betonit";

  /**
   * Creates a BetOnIt object.
   * @param {board} board an optional game board.
   * @constructor
   */
  function BetOnIt() {

    console.log('********BetOnIt********');
    this.castReceiverManager_ = cast.receiver.CastReceiverManager.getInstance();
    this.castMessageBus_ =
        this.castReceiverManager_.getCastMessageBus(BetOnIt.PROTOCOL,
        cast.receiver.CastMessageBus.MessageType.JSON);
    this.castMessageBus_.onMessage = this.onMessage.bind(this);
    this.castReceiverManager_.onSenderConnected =
        this.onSenderConnected.bind(this);
    this.castReceiverManager_.onSenderDisconnected =
        this.onSenderDisconnected.bind(this);
    this.castReceiverManager_.start();
  }
//*********************************************************************************************************



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//
//BetOnIt = {
//	onSenderConnected,
//	onSenderDisconnected,
//	onMessage,
//	onJoin,
//	onLeave,
//	sendError,
//	onBet,
//	onGuess,
//	onGameEnded,
//	broadcastEndGame,
//	startGame,
//	broadcast
//	}
//
//


  // Adds event listening functions to BetOnIt.prototype.
  BetOnIt.prototype = {

    /**
     * Sender Connected event
     * @param {event} event the sender connected event.
     */
    onSenderConnected: function(event) {
      console.log('onSenderConnected. Total number of senders: ' +
          this.castReceiverManager_.getSenders().length);
    },

    /**
     * Sender disconnected event; if all senders are disconnected,
     * closes the application.
     * @param {event} event the sender disconnected event.
     */
    onSenderDisconnected: function(event) {
      console.log('onSenderDisconnected. Total number of senders: ' +
          this.castReceiverManager_.getSenders().length);

      if (this.castReceiverManager_.getSenders().length == 0) {
        window.close();
      }
    },

    /**
     * Message received event; determines event message and command, and
     * choose function to call based on them.
     * @param {event} event the event to be processed.
     */
    onMessage: function(event) {
      var message = event.data;
      var senderId = event.senderId;
      console.log('********onMessage********' + JSON.stringify(event.data));
      console.log('mPlayer1: ' + this.mPlayer1);
      console.log('mPlayer2: ' + this.mPlayer2);

      if (message.command == 'join') {
        this.onJoin(senderId, message);
      } else if (message.command == 'leave') {
        this.onLeave(senderId);
		} else if (message.command == 'ready') {
        this.onReady(senderId);
		} else if (message.command == 'guess') {
        this.onGuess(senderId, message);
      } else if (message.command == 'bet') {
        this.onBet(senderId, message);
      } else {
        console.log('Invalid message command: ' + message.command);
      }
    },

    /**
     * Player joined event: registers a new player who joined the game, or
     * prevents player from joining if invalid.
     * @param {string} senderId the sender the message came from.
     * @param {Object|string} message the name of the player who just joined.
     */
    onJoin: function(senderId, message) {
      console.log('****onJoin****');
	  
	  
    },
	
	imageLoad: function(message){
		console.log('*****imageLoad**********');
		    
		var arrayBufferView = new Uint8Array( this.response );
    	var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
		
	},
    /**
     * Player leave event: determines which player left and unregisters that
     * player, and ends the game if all players are absent.
     * @param {string} senderId the sender ID of the leaving player.
     */
    onLeave: function(senderId) {
      console.log('****OnLeave****');

    },

    /**
     * add guess to the guessesArray when received
     * @param {string} senderId the sender the event came from.
	 * @param {int} guess the value of the guess.
     */
    onBet: function(senderId, message) {
      console.log('****onBet****');

    },
	
	/**
     * add guess to the guessesArray when received
     * @param {string} senderId the sender the event came from.
	 * @param {int} guess the value of the guess.
     */
    onGuess: function(senderId, message) {
      console.log('****onGuess****');
	  
	  var guess = message.guess;
	  guesses[senderId] = guess;
	  //check if all guesses have been received, if so, trigger 

    },
	
	/**
     * add guess to the guessesArray when received
     * @param {string} senderId the sender the event came from.
	 * @param {int} guess the value of the guess.
     */
    onAllGuessesReceived: function() {
      console.log('****onAllGuessesReceived****');
	  
	  //trigger the guess reveal animation

    },

    sendError: function(senderId, errorMessage) {
      this.castMessageBus_.send(senderId, {
        'event': 'error',
        'message': errorMessage });
    },

    broadcastEndGame: function(endState, winningLocation) {
      console.log('****endGame****');

      this.broadcast({
        event: 'endgame',
        end_state: endState });
    },
	
	broadcastGuessRequest: function(questionString) {
      console.log('****GuessRequest****');	  
	  
      this.broadcast({
        event: 'guess_request',
		question: questionString
		 });
    },
	
	broadcastBetRequest: function(guessObject) {
      console.log('****BetRequest****');

      this.broadcast({
        event: 'bet_request',
		guesses: guessObject });
    },

    /**
     * @private
     */
    startGame_: function() {
      console.log('****startGame****');

    },

    /**
     * Broadcasts a message to all of this object's known channels.
     * @param {Object|string} message the message to broadcast.
     */
    broadcast: function(message) {
      this.castMessageBus_.broadcast(message);
    }

  };
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=


  // Exposes public functions and APIs
  cast.BetOnIt = BetOnIt;
})();


//EXAMPLE TARGETTED MESSAGING

      //this.castMessageBus_.send(
//          this.mPlayer1.senderId, {
//            event: 'joined',
//            player: this.mPlayer1.player,
//            opponent: this.mPlayer2.name
//          });
//      this.castMessageBus_.send(
//          this.mPlayer2.senderId, {
//            event: 'joined',
//            player: this.mPlayer2.player,
//            opponent: this.mPlayer1.name
//          });
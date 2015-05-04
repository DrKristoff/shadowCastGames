
// External namespace for cast specific javascript library
var cast = window.cast || {};

// Anonymous namespace***********************************************************************************
(function() {
  'use strict';
  
    var app_id = "896E2978";

	var numPlayers = 0;

  TicTacToe.PROTOCOL = "urn:x-cast:com.betonit";

  TicTacToe.PLAYER = {
    O: 'O',
    X: 'X'
  };

  /**
   * Creates a TicTacToe object.
   * @param {board} board an optional game board.
   * @constructor
   */
  function TicTacToe(board) {
    this.mBoard = board;
    this.mPlayer1 = -1;
    this.mPlayer2 = -1;
    this.mCurrentPlayer;

    console.log('********TicTacToe********');
    this.castReceiverManager_ = cast.receiver.CastReceiverManager.getInstance();
    this.castMessageBus_ =
        this.castReceiverManager_.getCastMessageBus(TicTacToe.PROTOCOL,
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
//TicTacToe = {
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


  // Adds event listening functions to TicTacToe.prototype.
  TicTacToe.prototype = {

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
        this.onGuess(senderId);
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

      if ((this.mPlayer1 != -1) &&
          (this.mPlayer1.senderId == senderId)) {
        this.sendError(senderId, 'You are already ' +
                       this.mPlayer1.player +
                       ' You aren\'t allowed to play against yourself.');
        return;
      }
      if ((this.mPlayer2 != -1) &&
          (this.mPlayer2.senderId == senderId)) {
        this.sendError(senderId, 'You are already ' +
                       this.mPlayer2.player +
                       ' You aren\'t allowed to play against yourself.');
        return;
      }

      if (this.mPlayer1 == -1) {
        this.mPlayer1 = new Object();
        this.mPlayer1.name = message.name;
        this.mPlayer1.senderId = senderId;
      } else if (this.mPlayer2 == -1) {
        this.mPlayer2 = new Object();
        this.mPlayer2.name = message.name;
        this.mPlayer2.senderId = senderId;
      } else {
        console.log('Unable to join a full game.');
        this.sendError(senderId, 'Game is full.');
        return;
      }

      console.log('mPlayer1: ' + this.mPlayer1);
      console.log('mPlayer2: ' + this.mPlayer2);

      if (this.mPlayer1 != -1 && this.mPlayer2 != -1) {
        this.mBoard.reset();
        this.startGame_();
      }
    },

    /**
     * Player leave event: determines which player left and unregisters that
     * player, and ends the game if all players are absent.
     * @param {string} senderId the sender ID of the leaving player.
     */
    onLeave: function(senderId) {
      console.log('****OnLeave****');

      if (this.mPlayer1 != -1 && this.mPlayer1.senderId == senderId) {
        this.mPlayer1 = -1;
      } else if (this.mPlayer2 != -1 && this.mPlayer2.senderId == senderId) {
        this.mPlayer2 = -1;
      } else {
        console.log('Neither player left the game');
        return;
      }
      console.log('mBoard.GameResult: ' + this.mBoard.getGameResult());
      if (this.mBoard.getGameResult() == -1) {
        this.mBoard.setGameAbandoned();
        this.broadcastEndGame(this.mBoard.getGameResult());
      }
    },

    /**
     * Request event for the board layout: sends the current layout of pieces
     * on the board through the channel.
     * @param {string} senderId the sender the event came from.
     */
    onBet: function(senderId) {
      console.log('****onBet****');

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
  cast.TicTacToe = TicTacToe;
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

"use strict"; 

function RampDuelScene() {

  Scene.call(this); 

  ///// SETUP ALL ACTORS HERE /////
	this.bgBorder = new BackgroundBorder();
	this.addActor(this.bgBorder);
  
	this.homeButton = new HomeButton(this.homeAction.bind(this));
	this.addActor(this.homeButton);
	
	this.backButton = new BackButton(this.backAction.bind(this));
	this.addActor(this.backButton);
	
	this.title = new Label(windowWidth/2, titleYPos, "Ramp Duel Control", {size:50, leading:50});
	this.addActor(this.title);
	
	this.demoButton = new TextButton(windowWidth*.17, windowHeight/2, windowWidth*.16, windowHeight*.15, BLUE, "Demo", {size:25, leading:25}, this.demoAction.bind(this), 'rect');
	this.addActor(this.demoButton);
	
	this.scoreLabel = new Label(windowWidth*.5, windowHeight*.3, "Score: 0", {size:40, leading:40});
	this.addActor(this.scoreLabel);
	
	this.leftPistonButton = new TextButton(windowWidth*.42, windowHeight/2, windowWidth*.16, windowHeight*.15, BLUE, "Fire Left Piston", {size:25, leading:25}, this.leftPistonAction.bind(this), 'rect');
	this.addActor(this.leftPistonButton);
	
	this.rightPistonButton = new TextButton(windowWidth*.67, windowHeight/2, windowWidth*.16, windowHeight*.15, BLUE, "Fire Right Piston", {size:25, leading:25}, this.rightPistonAction.bind(this), 'rect');
	this.addActor(this.rightPistonButton);
	
	//this.resetScoreButton = new TextButton(windowWidth*.42, windowHeight.4, windowWidth*.16, windowHeight*.15, BLUE, "Reset Score", {size:25, leading:25}, this.resetScoreAction.bind(this), 'rect');
	//addActor(this.resetScoreButton);
	
}

_inherits(RampDuelScene, Scene); 

///// CUSTOM FUNCTIONS BELOW THIS LINE /////

RampDuelScene.prototype.homeAction = function() {
	manager.changeState(STATE_IDLE);
	stage.transitionTo("OpeningScene",-1);
}

RampDuelScene.prototype.demoAction = function() {
	RAMPDUEL.master.events.fireLeftPiston();
	stage.pause("Running Demo");
	setTimeout(function() { RAMPDUEL.master.events.fireRightPiston(); 
		stage.resume();
	}, 1000);
}

function updateScore(label) {
	label.text = "Score: "+RAMPDUEL.tablet.values.score.value;
}

RampDuelScene.prototype.leftPistonAction = function() {
	console.log("Hi");
	RAMPDUEL.master.events.fireLeftPiston();
	setTimeout(updateScore(this.scoreLabel) , 500);
}

RampDuelScene.prototype.rightPistonAction = function() {
	console.log("Hi 2");
	RAMPDUEL.master.events.fireRightPiston();
	setTimeout(updateScore(this.scoreLabel) , 500);
}

RampDuelScene.prototype.backAction = function() {
	manager.changeState(STATE_IDLE);
	stage.transitionTo("MenuScene",-1);
}

RampDuelScene.prototype.resetScoreAction = function() {
	RAMPDUEL.master.events.resetScore();
	this.resetScoreButton.text="Score: 0";
}
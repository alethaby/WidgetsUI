
"use strict"; 

function RoboticArmScene() {

  Scene.call(this); 

	var wheelSize = windowWidth*.32;
	
	///// SETUP ALL ACTORS HERE /////
	this.bgBorder = new BackgroundBorder();
	this.addActor(this.bgBorder);
  
	this.homeButton = new HomeButton(this.homeAction.bind(this));
	this.addActor(this.homeButton);

	this.title = new Label(windowWidth/2, titleYPos, "Robotic Arm Control", {size:50, leading:50});
	this.addActor(this.title);
	
	this.armPlatformWheel = new Wheel(windowWidth*.7-wheelSize/2, windowHeight*.53-wheelSize/2, wheelSize, wheelSize, this.armPlatformMovement.bind(this), 0, 1, 0, 360);
	this.addActor(this.armPlatformWheel);
	this.armPlatformWheelLabel = new Label(windowWidth*.7, windowHeight*.53, "Arm Position from Home (revs): 0", {size:25, leading:25});
	this.addActor(this.armPlatformWheelLabel);
	
	this.demoButton = new TextButton(windowWidth*.25, windowHeight*.22, windowWidth*.16, windowHeight*.15, BLUE, "Demo", {size:25, leading:25}, this.demoAction.bind(this), 'rect');
	this.addActor(this.demoButton);
	
	this.pistonButton = new TextButton(windowWidth*.25, windowHeight*.44, windowWidth*.16, windowHeight*.15, BLUE, "Piston: High", {size:25, leading:25}, this.pistonAction.bind(this), 'rect');
	this.addActor(this.pistonButton);
	
	this.eMagnetButton = new TextButton(windowWidth*.25, windowHeight*.65, windowWidth*.16, windowHeight*.15, BLUE, "Magnet: Off", {size:25, leading:25}, this.magnetAction.bind(this), 'rect');
	this.addActor(this.eMagnetButton);
	
	this.backButton = new BackButton(this.backAction.bind(this));
	this.addActor(this.backButton);
	
	manager.setEventHandler(ROBOTICARM.tablet.events.demoComplete, this.demoCompleteAction.bind(this));
}

_inherits(RoboticArmScene, Scene); 

///// CUSTOM FUNCTIONS BELOW THIS LINE /////

RoboticArmScene.prototype.armPlatformMovement = function(angle) {
	var revs = angle/3.6;
	manager.change(ROBOTICARM.master.values.position, revs);
	this.armPlatformWheelLabel.text = "Arm Position from Home (revs): "+(revs/100).toFixed(2);
}

RoboticArmScene.prototype.demoAction = function() {
	ROBOTICARM.master.events.demo();
	stage.pause("Running Demo");
}

RoboticArmScene.prototype.pistonAction = function() {
	if(piston == false){
		this.pistonButton.text = "Piston: Low";
		ROBOTICARM.master.events.pistonOn();
		piston = true;
	}
	else{
		this.pistonButton.text = "Piston: High";
		ROBOTICARM.master.events.pistonOff();
		piston = false;
	}	
}

RoboticArmScene.prototype.magnetAction = function() {
	if(magnet == false){
		this.eMagnetButton.text = "Magnet: On";
		ROBOTICARM.master.events.eMagnetOn();
		magnet = true;
	}
	else{
		this.eMagnetButton.text = "Magnet: Off";
		ROBOTICARM.master.events.eMagnetOff();
		magnet = false;
	}
}

RoboticArmScene.prototype.homeAction = function() {
	manager.changeState(STATE_IDLE);
	stage.transitionTo("OpeningScene",-1);
}

RoboticArmScene.prototype.backAction = function() {
	manager.changeState(STATE_IDLE);
	stage.transitionTo("MenuScene",-1);
}

RoboticArmScene.prototype.demoCompleteAction = function(){
	stage.resume();
}
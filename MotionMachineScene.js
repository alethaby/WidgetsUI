
"use strict"; 

function MotionMachineScene() {

  Scene.call(this); 

  ///// SETUP ALL ACTORS HERE /////
	this.bgBorder = new BackgroundBorder();
	this.addActor(this.bgBorder);
  
	this.homeButton = new HomeButton(this.homeAction.bind(this));
	this.addActor(this.homeButton);

	this.title = new Label(windowWidth/2, titleYPos, "Motion Machine Control", {size:50, leading:50});
	this.addActor(this.title);
	
	this.rampVerticalSlider = new VerticalSlider(windowWidth*.7, windowHeight*.2, windowHeight*.55, 225, 0, 0, this.setRampPosition.bind(this));
	this.rampVerticalSlider.VerticalSliderImage(sphereImg);
	this.addActor(this.rampVerticalSlider);
	this.rampVerticalSliderLabel = new Label(windowWidth*.72, windowHeight*.8, "Ramp Position (mm): 0", {size:25, leading:25});
	this.addActor(this.rampVerticalSliderLabel);
	
	this.demoButton = new TextButton(windowWidth*.25, windowHeight*.22, windowWidth*.16, windowHeight*.15, BLUE, "Demo", {size:25, leading:25}, this.demoAction.bind(this), 'rect');
	this.addActor(this.demoButton);
	
	this.stairsButton = new TextButton(windowWidth*.25, windowHeight*.44, windowWidth*.16, windowHeight*.15, BLUE, "Stairs: Off", {size:25, leading:25}, this.stairsAction.bind(this), 'rect');
	this.addActor(this.stairsButton);
	
	this.gateButton = new TextButton(windowWidth*.25, windowHeight*.65, windowWidth*.16, windowHeight*.15, BLUE, "Gate: Open", {size:25, leading:25}, this.gateAction.bind(this), 'rect');
	this.addActor(this.gateButton);
	
	this.backButton = new BackButton(this.backAction.bind(this));
	this.addActor(this.backButton);
	
	manager.setEventHandler(MOTIONMACHINE.tablet.events.demoComplete, this.demoCompleteAction.bind(this));
}

_inherits(MotionMachineScene, Scene); 

///// CUSTOM FUNCTIONS BELOW THIS LINE /////

MotionMachineScene.prototype.setRampPosition = function(pos) {
	manager.change(MOTIONMACHINE.master.values.position, pos);
	this.rampVerticalSliderLabel.text = "Ramp Position (mm): "+pos;
}

MotionMachineScene.prototype.demoAction = function() {
	MOTIONMACHINE.master.events.demo();
	gate = true;
	this.gateButton.text = "Gate: Closed";
	stage.pause("Running Demo");
	setTimeout(function() { stage.resume(); }, 25000);
	
}

MotionMachineScene.prototype.stairsAction = function() {
	if(stairs == false){
		this.stairsButton.text = "Stairs: On";
		MOTIONMACHINE.master.events.stairsOn();
		stairs = true;
	}
	else{
		this.stairsButton.text = "Stairs: Off";
		MOTIONMACHINE.master.events.stairsOff();
		stairs = false;
	}	
}

MotionMachineScene.prototype.gateAction = function() {
	if(gate == false){
		this.gateButton.text = "Gate: Closed";
		MOTIONMACHINE.master.events.closeServo();
		gate = true;
	}
	else{
		this.gateButton.text = "Gate: Open";
		MOTIONMACHINE.master.events.openServo();
		gate = false;
	}
}

MotionMachineScene.prototype.homeAction = function() {
	manager.changeState(STATE_IDLE);
	stage.transitionTo("OpeningScene",-1);
}

MotionMachineScene.prototype.backAction = function() {
	manager.changeState(STATE_IDLE);
	stage.transitionTo("MenuScene",-1);
}

MotionMachineScene.prototype.demoCompleteAction = function(){
	stage.resume();
}
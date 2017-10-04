
'use strict';

var floor = Math.floor;
var stage = new Stage();
var manager;

////// DELCARE ALL VARIABLES (SCENES, IMAGES, ETC...) HERE /////
var sphereImg;
var stairs = false;
var gate = false;
var piston = false;
var magnet = false;

function preload() {
	////// IMPORT ALL IMAGES HERE //////
	sphereImg = loadImage("/libs/images/sphere.png");
}


function setup() {
	MASTER=true;
	resizeCanvas(windowWidth, windowHeight);

	initMenuVariables();

	////// SETUP ALL SCENES HERE ////////
	this.OpeningScene = new ConsoleOpeningScene(openingAction);
	var menuButtonNames = ["Motion Machine", "Robotic Arm", "Ramp Duel"];
	var menuButtonActions = [this.motionMachineButtonAction.bind(this), this.roboticArmButtonAction.bind(this),this.rampDuelButtonAction.bind(this)];
	this.MenuScene = new ButtonsScene("Widgets Control Menu", null, menuButtonNames, menuButtonActions, homeAction, null, null, {size:50, leading:50});
	this.MotionMachineScene = new MotionMachineScene();
	this.RoboticArmScene = new RoboticArmScene();
	this.RampDuelScene = new RampDuelScene();
	stage.addScene("OpeningScene", this.OpeningScene);
	stage.addScene("MenuScene", this.MenuScene);
	stage.addScene("MotionMachineScene", this.MotionMachineScene);
	stage.addScene("RoboticArmScene", this.RoboticArmScene);
	stage.addScene("RampDuelScene", this.RampDuelScene);

	manager.changeState(STATE_IDLE);
	stage.transitionTo('OpeningScene');
	manager.setEventHandler(MOTIONMACHINE.tablet.events.demoComplete, this.demoCompleteAction.bind(this));
}

function draw() {
	stage.draw();
}

function openingAction(){
	stage.transitionTo('MenuScene');
}

function motionMachineButtonAction(){
	manager.changeState(STATE_MOTIONMACHINE);
	console.log("Motion Machine button pressed.");
	MOTIONMACHINE.master.events.goHome();
	stage.pause("Homing Motion Machine Ramp");
	stage.transitionTo('MotionMachineScene');
}

function roboticArmButtonAction(){
	manager.changeState(STATE_ROBOTICARM);
	ROBOTICARM.master.events.goHome();
	console.log("Robot Arm button pressed.");
	stage.transitionTo('RoboticArmScene');
}

function rampDuelButtonAction(){
	manager.changeState(STATE_RAMPDUEL);
	console.log("Ramp Duel button pressed.");
	stage.transitionTo('RampDuelScene');
}

function demoCompleteAction(){
	stage.resume();
}

function homeAction(){
	stage.transitionTo('OpeningScene',-1);
}

// all these are needed to handle touch/mouse events properly
window.touchStarted = stage.touchStarted.bind(stage);
window.touchMoved = stage.touchMoved.bind(stage);
window.touchEnded = stage.touchEnded.bind(stage);
window.mousePressed = stage.mousePressed.bind(stage);
window.mouseDragged = stage.mouseDragged.bind(stage);
window.mouseReleased = stage.mouseReleased.bind(stage);

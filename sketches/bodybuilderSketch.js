//Declare variables:
var cnv;
let video;
let poseNet;
let poses = [];

let leftShoulder;
let rightShoulder;
let leftWrist;
let rightWrist;
let leftElbow;
let rightElbow;
let leftKnee;
let rightKnee;
let leftAnkle;
let rightAnkle;
let leftHip;
let rightHip;
let torso;

//Preload images for collage creator://Preload images:
function preload() {
  
  leftShoulderImage = loadImage('assets/bb/leftShoulderbb.png');
  rightShoulderImage = loadImage('assets/bb/rightShoulderbb.png');
  
  leftWristImage = loadImage('assets/bb/leftWristbb.png');
  rightWristImage = loadImage('assets/bb/rightWristbb.png');
  
  leftElbowImage = loadImage('assets/bb/leftElbowbb.png');
  rightElbowImage = loadImage('assets/bb/rightElbowbb.png');
  
  leftKneeImage = loadImage('assets/bb/leftKneebb.png');
  rightKneeImage = loadImage('assets/bb/rightKneebb.png');
 
  leftAnkleImage = loadImage('assets/bb/leftAnklebb.png');
  rightAnkleImage = loadImage('assets/bb/rightAnklebb.png');
  
  rightHipImage = loadImage('assets/bb/leftHipbb.png');
  leftHipImage = loadImage('assets/bb/rightHipbb.png');
  
  torsoImage = loadImage('assets/bb/torsobb.png')
}

function centerCanvas(){
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

//setup environment for posenet

function setup() {
  cnv = createCanvas(640, 480);
  centerCanvas();
  cnv.style('display', 'block');
  video = createCapture(VIDEO);
  //video.size(width, height);
  video.hide()

  //create a new poseNet method with a
  //this calls poseNet from ml5.js single detection
  poseNet = ml5.poseNet(video, modelReady);

  //this sets up an envent that fills the global variable "poses"
  //with an array every time new poses are detected
  poseNet.on("pose", function(results) {
  poses = results;
    
  //frameRate(10);
  });
}

// to let us know the model is ready
function modelReady() {
  console.log("Model Loaded");
}

function draw() {
  
  
  //draw collages
  imageMode(CORNER);
  image(video, 0, 0, width, height);
  imageMode(CENTER);
  
  background(100, 100);
  // bg=color(100);
  // bg.setAlpha(10);
  
   tint(200, 100);
  poseImages();
  
}

function poseImages() {

  //if the confidence score is more than zero, the image will showageMode(CENTER);
  if (poses.length > 0) {
    let pose = poses[0].pose;
    

    //image(preloaded images, x.axis, y.axiwheight)

    let leftShoulder = pose.leftShoulder;
    image(leftShoulderImage, leftShoulder.x, leftShoulder.y, 80, 80);

    let rightShoulder = pose.rightShoulder;
    image(rightShoulderImage, rightShoulder.x, rightShoulder.y, 80, 80);
    
    let leftHip = pose.leftHip;
    image(leftHipImage, leftHip.x, leftHip.y, 90, 90);
    
    let rightHip = pose.rightHip;
    image(rightHipImage, rightHip.x, rightHip.y, 90, 90);
    
    let torso = pose.torso;
    image(torsoImage, (leftShoulder.x + rightShoulder.x)/2, (leftShoulder.y + rightShoulder.y)/1.4, 170, 170);
    
    let leftWrist = pose.leftWrist;
    image(leftWristImage, leftWrist.x, leftWrist.y, 90, 90);

    let rightWrist = pose.rightWrist;
    image(rightWristImage, rightWrist.x, rightWrist.y, 90, 90);

    let leftElbow = pose.leftElbow;
    image(leftElbowImage, leftElbow.x, leftElbow.y, 80, 80);

    let rightElbow = pose.rightElbow;
    image(rightElbowImage, rightElbow.x, rightElbow.y, 70, 70);

    let leftKnee = pose.leftKnee;
    image(leftKneeImage, leftKnee.x, leftKnee.y, 100, 100);

    let rightKnee = pose.rightKnee;
    image(rightKneeImage, rightKnee.x, rightKnee.y, 100, 100);

    let leftAnkle = pose.leftAnkle;
    image(leftAnkleImage, leftAnkle.x, leftAnkle.y, 90, 90);

    let rightAnkle = pose.rightAnkle;
    image(rightAnkleImage, rightAnkle.x, rightAnkle.y, 90, 90);
  }
  function windowResized(){
      centerCanvas();
      resizeCanvas(640, 480);
  }

}

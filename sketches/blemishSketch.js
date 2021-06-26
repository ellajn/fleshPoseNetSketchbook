var cnv;
var poseNet;
var video;
var poses = [];

function centerCanvas(){
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(640, 480);
  centerCanvas();
  cnv.style('display', 'block');

  //use webcam video
  video = createCapture(VIDEO);
  video.hide();
  //set up ml5 poseNet https://learn.ml5js.org/#/reference/posenet
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotResult);
  
  //color array for 'blemishes' on the keypoints
  var colors = [];  
}

function draw() {
  //background(207, 195, 138, 50); //no longer needed as using tint
  //set color tint and alpha value 
  bg = color(186, 142, 172);
  bg.setAlpha(5);
  tint(bg);
  image(video, 0, 0, width, height); //video same width and height of the canvas!
  
  circle();
}

function modelLoaded(){
  console.log('Model Is Ready');
}

function gotResult(results){
  poses = results
}

function circle()  {
  
  //FLESH COLOUR PALETTE
  // let colors = [color(197, 140, 133), color(236, 188, 180), color(209, 163, 164), color(161, 102, 94), color(80, 51, 53), color(89, 47, 42), color(141, 85, 36), color(198, 134, 66), color(224, 172, 105), color(241, 194, 125), color(255, 219, 172), color(255, 224, 189), color(255, 205, 148), color(234, 192, 134), color(255, 173, 96), color(255, 227, 159), color(220, 127, 142), color(229, 161, 170), color(244, 191, 190), color(255, 224, 218), color(244, 196, 178), color(232, 176, 141)];
  //BLEMISH COLOUR PALETTE
  let colors =  [color(158, 141, 101), color(207, 195, 138), color(255, 248, 174), color(237, 237, 174), color(219, 225, 174), color(231, 189, 167), color(242, 153, 159), color(214, 148, 166), color(186, 142, 172), color(153, 135, 92), color(199, 186, 121), color(255, 247, 161), color(166, 166, 121), color(161, 163, 144), color(204, 164, 143),  color(156, 87, 92), color(130, 73, 88), color(87, 61, 78)]
  
  //pose keypoint estimation setup
  for (let i = 0; i < poses.length; i++) {
  let pose = poses[i].pose;
  for (let j = 0; j < pose.keypoints.length; j++) {
  let keypoint = pose.keypoints[j];
  if (keypoint.score > 0.2) {
        
  //VISUAL aspect of the keypoints allowing for variety of strokes, colours and ellipse size 
  noFill();
  //fill(colors[int(random(0, colors.length))]);
  //noStroke();
  strokeWeight(random(3));
  stroke(colors[int(random(0, colors.length))]);
  ellipse((keypoint.position.x - 30) , (keypoint.position.y - 30), (keypoint.position.x - keypoint.position.y)/2, (keypoint.position.y / 10));
        
  //pimples
  stroke(200,0,100);
  ellipse(keypoint.position.x, keypoint.position.y, 0, 0);
      }  
    }
  }
  function windowResized(){
    centerCanvas();
    resizeCanvas(640, 480);
  }
}
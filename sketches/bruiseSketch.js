//Spots, bruises, blemishes without video capture

//Declare global variabels
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
  //BLEMISH colour palette 
  background(207, 195, 138, 10);
  
   circle();
}

function modelLoaded(){
  console.log('Model Is Ready');
}

function gotResult(results){
  poses = results
}

function circle()  {
  //BLEMISH COLOUR PALETTE
  let colors =  [color(158, 141, 101), color(207, 195, 138), color(255, 248, 174), color(237, 237, 174), color(219, 225, 174), color(231, 189, 167), color(242, 153, 159), color(214, 148, 166), color(186, 142, 172), color(153, 135, 92), color(199, 186, 121), color(255, 247, 161), color(166, 166, 121), color(161, 163, 144), color(204, 164, 143),  color(156, 87, 92), color(130, 73, 88), color(87, 61, 78)];
  
  //pose keypoint estimation setup
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        
        //VISUAL aspect of the keypoints allowing for variety of strokes, colours and ellipse size 
        //bruises
        noStroke();
        ellipse((keypoint.position.x - 50), (keypoint.position.y - 30), (keypoint.position.x - keypoint.position. y)/2, (keypoint.position.y / 10));
        
        //pimples
        stroke(200,0,100);
        ellipse(keypoint.position.x, keypoint.position.y, 2, 2);
        ellipse((keypoint.position.x - 3), (keypoint.position.y * 2), (random(4)), (random(2)));
        
        //freckles
        fill(158, 141, 101);
        noStroke();
        ellipse((keypoint.position.x + 15), (keypoint.position.y - 10), 3, 3);
        ellipse((keypoint.position.x - 4), (keypoint.position.y + 3), 4, 3);
        ellipse((keypoint.position.x + 4), (keypoint.position.y + 7), 4, 3);
        
        //stretchmark scarring
        strokeWeight(random(3))
        stroke(186, 142, 172, 40);
        line((keypoint.position.x - 10), (keypoint.position.y - 10), (keypoint.position.y - (random(5))), (keypoint.position.x + (random(2))))
      }  
    }
  }
  function windowResized(){
    centerCanvas();
    resizeCanvas(640, 480);
  }
}

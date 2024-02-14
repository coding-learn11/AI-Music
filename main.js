song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";


function preLoad() {
    song1 = loadSound("From The Start - Laufey.mp3");
    song2 = loadSound("Feels Like - Gracie Abrams.mp3");
}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Intialized');
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.x;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("FF0000");
    stroke("FF0000");
    song1_status = song1.isPlaying();
    console.log(song1_status);
    song2_status = song2.isPlaying();
    console.log(song2_status);
    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        
        if(song1_status == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song Name: From the Start by Laufey";
        }
    }
    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20)
        song1.stop();
        if(song2_status == false) {
            song2.play();
            document.getElementById("song_name").innerHTML= "Song Name: Feels Like by Gracie Abrams";  
        }
    }

}
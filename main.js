objects = [];

function setup() {
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded); 
    document.getElementById("status").innerHTML = "status: detecting objects";
}

status = "";

function draw() {
    image(img,0,0,640,420);

    for (let i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "status: Objects Detected";
        
        fill("midnightblue");
        strokeWeight(1);
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
        stroke("midnightblue");
        noFill();
        strokeWeight(3);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
function preload() {
    img  = loadImage('dog_cat.jpg');
}

function modelLoaded() {
    console.log("model is loaded");
    status = true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}


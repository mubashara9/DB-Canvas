var canvas;
var database;
var drawing = [];

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("canvascontainer");
  database = firebase.database();
  background(51);

  var clearButton = select("#clearbutton");
  clearButton.mousePressed(clearDrawing);
}

function mouseDragged() {
  var point = {
    x: mouseX,
    y: mouseY,
  };
  drawing.push(point);
  updateDrawing();
}

function draw() {
  background(51);
  drawDrawing();
}

function updateDrawing() {
  var drawingRef = database.ref("drawing");
  drawingRef.set({
    d: drawing,
  });
}

function drawDrawing() {
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < drawing.length; i++) {
    vertex(drawing[i].x, drawing[i].y);
  }
  endShape();
}

function readData() {
  database.ref("drawing").on("value", (data) => {
    var dbData = data.val();
    if (dbData) {
      drawing = dbData.d || [];
    }
  });
}

function clearDrawing() {
  drawing = [];
  updateDrawing();
}

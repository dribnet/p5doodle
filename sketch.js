var speed = .0001;
var n = 30; 
var grid = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  var spacing = min(width, height) / n;
  for(var y = 0; y < height; y += spacing) {
    for(var x = 0; x < width; x += spacing) {
      grid.push(createVector(x, y));
    }
  }
}

function draw() {
  var a = map(cos(millis() * speed * 10), -1, 1, 0, 255);
  background(255, a);
  
  var control = [];
  var mouse_control = null;
  for(var i = 0; i < 8; i++) {
    var x = width * noise(i*2 + 0, millis() * speed);
    var y = height * noise(i*2 + 1, millis() * speed);
    var v = createVector(x, y);
    if(i == 0) {
      x = mouseX;
      y = mouseY;
      var v = createVector(x, y);
      mouse_control = v;
    }
    else {
      var v = createVector(x, y);
    }
    control.push(v);
    // ellipse(v.x, v.y, 10, 10); // draw centers
  }
  
  noStroke();
  
  var range = min(width, height) / 3;
  var zoom = range / 4;
  
  grid.forEach(function (v) {
    var total_mouse_push = 0;
    var vv = v.copy();
    control.forEach(function (c) {
      var difference = p5.Vector.sub(v, c);
      var length = difference.mag();
      difference.div(length);
      if(length < range) {
        var amt = map(cos(map(length, 0, range, 0, TWO_PI)), 1, -1, 0, zoom);
        vv.add(difference.mult(amt));
        if (c === mouse_control) {
          total_mouse_push = total_mouse_push + amt;
        }
      }
    })
    if(total_mouse_push > 10) {
      fill(160,20,20, 220);
    }
    else {
      fill(112,128,132, 150);
    }

    ellipse(vv.x, vv.y, 2, 2);
  });
}
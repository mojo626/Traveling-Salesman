//
// This program gets the shortest possible path between a set of points
//

//How many points there are
var numPoints = 9;
//the arrays for the points x and y positions
var x;
var y;
var path;
var paths;
var bestPath = new Array(numPoints);
var secondPath = new Array(numPoints);
var bestDis = 99999999;
//how many iterations have passed
var iter = 0;
//the total distance of all of the paths (for averaging)
var totalDis = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
    background(255);
  x = new Array(numPoints);
  y = new Array(numPoints);
  path = new Array(numPoints);
  for (var i = 0; i < numPoints; i++)
  {
    //selecting random x and y values for the points
    x[i] = random(0, windowWidth);
    y[i] = random(0, windowHeight);
    path[i] = i;
  }

  //getting all of the paths that can be taken
  paths = permutator(path);


  background(0);
  drawPoints();
  
  run();


}

async function run()
{
  for (var i = 0; i < paths.length; i++)
  {

    //Drawing the background, text, points, etc.
    background(0);

    fill(255);
    textSize(20);
    strokeWeight(1);
    text('Best Distance: ' + Math.round(bestDis), 10, 30);
    text('Iterations: ' + iter, 10, 60);
    text('Total Iterations: ' + paths.length, 10, 90);
    text('Average Distance: ' + Math.round(totalDis/iter), 10, 120);

    rect(10, 135, 150, 20);
    fill(100);
    rect(10,135,150 * (iter/paths.length),20);
    fill(255);

    //drawing the current path
    drawPath(paths[i]);
    //getting the length and evaluating the current path
    getLength(paths[i]);


    //drawing the best path in blue
    stroke(0, 0, 255,100);
    drawPath(bestPath);
    stroke(255);

    //drawing the points over the path
    drawPoints();

    iter++;

    //wait until the next frame every 200 calculations
    if (iter%200 == 0)
    {
      await sleep(0);
    }
  }

  //redraw all fo the text
  console.log(bestDis);
  background(0);
  drawPoints();
  drawPath(bestPath);
  fill(255);
    textSize(20);
    strokeWeight(1);
    text('Best Distance: ' + Math.round(bestDis), 10, 30);
  text('Iterations: ' + iter, 10, 60);
  text('Total Iterations: ' + paths.length, 10, 90);
    text('Average Distance: ' + Math.round(totalDis/iter), 10, 120);

  rect(10, 135, 150, 20);
    fill(0, 255, 0);
    rect(10,135,150 * (iter/paths.length),20);
    fill(255);
}

function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

//distance function
function dis(x1, y1, x2, y2)
{
  return sqrt(sq(x1-x2) + sq(y1-y2));   
}

//draws all of the points to the screen
function drawPoints()
{
    for (var i = 0; i < numPoints; i++)
    {
      stroke(255);
      strokeWeight(7);
      point(x[i], y[i]);    
    }
}

//draws the path to the screen
function drawPath(p)
{
    for(var i = 0; i < p.length - 1; i++)
    {
      strokeWeight(2);
      line(x[p[i]], y[p[i]], x[p[i + 1]], y[p[i + 1]]);
    }
}

//gets all of the possible paths between points
function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

function wait(time)
{
  start = millis()
  do
  {
    current = millis();
  }
  while(current < start + time)
}

//gets the length of a path and evaluates it
function getLength(path)
{
  var total = 0;
  //getting the total length of a path
  for (var i = 0; i < path.length - 1; i++){
      total+=dis(x[path[i]], y[path[i]], x[path[i+ 1]], y[path[i + 1]]);
  }

  //setting the best distance and path if it is beaten
  if (total < bestDis)
  {
    bestDis = total;
    secondPath = bestPath;
    bestPath = path;
  }

  //adding to the total distance for the average
  totalDis+=total;
}
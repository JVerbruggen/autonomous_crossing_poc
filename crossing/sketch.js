var drawWidth;
var drawHeight;
var crossing;
var vehicles;
var conflicts;
var supervisor;

class Environment{
  static displayConnections = false;
  static displayConflicts = false;
}

function setup() {
  drawWidth = windowWidth;
  drawHeight = windowHeight;
  createCanvas(drawWidth, drawHeight);

  let routeCalculator = new RandomRouteCalculator();
  initVehicleFactory(new DefaultVehicleFactory());
  // initVehicleFactory(new MasterSlaveVehicleFactory(routeCalculator));

  // let spawner = new ManualSpawner();
  let spawner = new AutoSpawner(1000);
  crossing = new StandardCrossing(spawner);
  // crossing = new DoubleLaneCrossing(spawner);
  // crossing = new Roundabout(spawner);
  vehicles = [];

  supervisor = vehicleFactory.CreateSupervisor();

  conflicts = new BlockSectionVisitor(30, 20).visitCrossing(crossing);
}

function draw() {
  clear();
  background(255);

  crossing.draw();
  drawConflicts(conflicts);
  updateVehicles();
  drawHelp();
}

function drawHelp(){
  let size = 25;
  let i = 0;
  let base = size;
  stroke(255);
  fill(0);
  textSize(size);
  text("Hold CTRL to see connections",15,base+size*i++);
  text("Hold SHIFT to see conflicts",15,base+size*i++);
}

function keyPressed(){
  if(keyCode === CONTROL){
    Environment.displayConnections = true;
  }else if(keyCode === SHIFT){
    Environment.displayConflicts = true;
  }
}

function keyReleased(){
  if(keyCode === CONTROL){
    Environment.displayConnections = false;
  }else if(keyCode === SHIFT){
    Environment.displayConflicts = false;
  }
}

function updateVehicles(){
  supervisor.updateVehicles();
}

function drawConflicts(conflicts){
  if(!Environment.displayConflicts) return;
  for(let conflict of conflicts){
    conflict.draw();
  }
}
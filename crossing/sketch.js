var drawWidth;
var drawHeight;
var crossing;
var vehicles;
var conflicts;

class Environment{
  static displayConnections = false;
  static displayConflicts = false;
}

function setup() {
  drawWidth = windowWidth;
  drawHeight = windowHeight;
  createCanvas(drawWidth, drawHeight);

  initVehicleFactory(new DefaultVehicleFactory());
  // initVehicleFactory(new MasterSlaveVehicleFactory());

  // let spawner = new ManualSpawner();
  let spawner = new AutoSpawner(1000);
  crossing = new StandardCrossing(spawner);
  // crossing = new DoubleLaneCrossing(spawner);
  // crossing = new Roundabout(spawner);
  vehicles = [];

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
  let i = 0;
  for(let vehicle of vehicles){
    if(vehicle.drivingOn == null){
      vehicles.splice(i,1);
      continue;
    }

    vehicle.doTick();
    vehicle.draw();

    i++;
  }
}

function drawConflicts(conflicts){
  if(!Environment.displayConflicts) return;
  for(let conflict of conflicts){
    conflict.draw();
  }
}
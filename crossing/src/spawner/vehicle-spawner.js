class ManualSpawner{
    createSpawner(lane){
        let spawnButton = createButton('Spawn');
        spawnButton.position((lane.x4-lane.x1)/2+lane.x1, (lane.y4-lane.y1)/2+lane.y1);
        spawnButton.mousePressed(() => lane.spawnVehicle());
    }
}

class AutoSpawner{
    constructor(interval){
        this.interval = interval;
    }

    createSpawner(lane){
        setInterval(() => lane.spawnVehicle(), this.interval);
    }
}
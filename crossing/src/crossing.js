class AbstractCrossing{
    constructor(spawner){
        this.connections = [];
        this.lanes = [];
    }

    post(){
        for(let lane of this.lanes){
            Array.prototype.push.apply(this.connections, lane.connectedAtStart);
            Array.prototype.push.apply(this.connections, lane.connectedAtEnd);
        }
    }

    addConnection(connection){
        this.connections.push(connection);
    }

    getConnections(){
        return this.connections;
    }

    draw(){
        for(let lane of this.lanes){
            lane.draw();
        }
    }
    
    accept(crossingVisitor){
        crossingVisitor.visitCrossing(this);
    }
}

class StandardCrossing extends AbstractCrossing{
    constructor(spawner){
        super(spawner);

        let laneWidth = 40;
        let lanePullback = 170;
        this.lanes = [
            new Lane(new Vector(0, drawHeight/2 + laneWidth), new Vector(drawWidth/2 - lanePullback, drawHeight/2 + laneWidth), laneWidth),
            new ExitLane(new Vector(drawWidth/2 - lanePullback, drawHeight/2 - laneWidth), new Vector(0, drawHeight/2 - laneWidth), laneWidth),
            new Lane(new Vector(drawWidth/2 - laneWidth, 0), new Vector(drawWidth/2 - laneWidth, drawHeight/2 - lanePullback), laneWidth),
            new ExitLane(new Vector(drawWidth/2 + laneWidth, drawHeight/2 - lanePullback), new Vector(drawWidth/2+laneWidth, 0), laneWidth),
            new Lane(new Vector(drawWidth, drawHeight/2 - laneWidth), new Vector(drawWidth/2 + lanePullback, drawHeight/2 - laneWidth), laneWidth),
            new ExitLane(new Vector(drawWidth/2 + lanePullback, drawHeight/2 + laneWidth), new Vector(drawWidth, drawHeight/2 + laneWidth), laneWidth),
            new Lane(new Vector(drawWidth/2 + laneWidth, drawHeight), new Vector(drawWidth/2 + laneWidth, drawHeight/2 + lanePullback), laneWidth),
            new ExitLane(new Vector(drawWidth/2 - laneWidth, drawHeight/2 + lanePullback), new Vector(drawWidth/2-laneWidth, drawHeight), laneWidth),
        ];

        for(let i = 0; i <= 6; i+=2){
            for(let j = 1; j <= 7; j+=2){
                this.lanes[i].connectAtEnd(this.lanes[j]);
            }
            spawner.createSpawner(this.lanes[i]);
        }
    
        this.post();
    }
}

class DoubleLaneCrossing extends AbstractCrossing{
    constructor(spawner){
        super(spawner);

        let laneWidth = 40;
        let lanePullback = 170;
        this.lanes = [
            new Lane(new Vector(0, drawHeight/2 + laneWidth), new Vector(drawWidth/2 - lanePullback, drawHeight/2 + laneWidth), laneWidth),
            new Lane(new Vector(0, drawHeight/2 + laneWidth*2), new Vector(drawWidth/2 - lanePullback, drawHeight/2 + laneWidth*2), laneWidth),
            new ExitLane(new Vector(drawWidth/2 - lanePullback, drawHeight/2 - laneWidth), new Vector(0, drawHeight/2 - laneWidth), laneWidth),
            new ExitLane(new Vector(drawWidth/2 - lanePullback, drawHeight/2 - laneWidth*2), new Vector(0, drawHeight/2 - laneWidth*2), laneWidth),
            new Lane(new Vector(drawWidth/2 - laneWidth, 0), new Vector(drawWidth/2 - laneWidth, drawHeight/2 - lanePullback), laneWidth),
            new Lane(new Vector(drawWidth/2 - laneWidth*2, 0), new Vector(drawWidth/2 - laneWidth*2, drawHeight/2 - lanePullback), laneWidth),
            new ExitLane(new Vector(drawWidth/2 + laneWidth, drawHeight/2 - lanePullback), new Vector(drawWidth/2+laneWidth, 0), laneWidth),
            new ExitLane(new Vector(drawWidth/2 + laneWidth*2, drawHeight/2 - lanePullback), new Vector(drawWidth/2+laneWidth*2, 0), laneWidth),
            new Lane(new Vector(drawWidth, drawHeight/2 - laneWidth), new Vector(drawWidth/2 + lanePullback, drawHeight/2 - laneWidth), laneWidth),
            new Lane(new Vector(drawWidth, drawHeight/2 - laneWidth*2), new Vector(drawWidth/2 + lanePullback, drawHeight/2 - laneWidth*2), laneWidth),
            new ExitLane(new Vector(drawWidth/2 + lanePullback, drawHeight/2 + laneWidth), new Vector(drawWidth, drawHeight/2 + laneWidth), laneWidth),
            new ExitLane(new Vector(drawWidth/2 + lanePullback, drawHeight/2 + laneWidth*2), new Vector(drawWidth, drawHeight/2 + laneWidth*2), laneWidth),
            new Lane(new Vector(drawWidth/2 + laneWidth, drawHeight), new Vector(drawWidth/2 + laneWidth, drawHeight/2 + lanePullback), laneWidth),
            new Lane(new Vector(drawWidth/2 + laneWidth*2, drawHeight), new Vector(drawWidth/2 + laneWidth*2, drawHeight/2 + lanePullback), laneWidth),
            new ExitLane(new Vector(drawWidth/2 - laneWidth, drawHeight/2 + lanePullback), new Vector(drawWidth/2-laneWidth, drawHeight), laneWidth),
            new ExitLane(new Vector(drawWidth/2 - laneWidth*2, drawHeight/2 + lanePullback), new Vector(drawWidth/2-laneWidth*2, drawHeight), laneWidth),
        ];

        for(let i = 0; i <= 12; i+=4){
            for(let j = 2; j <= 14; j+=4){
                if(j-i == 2) continue;

                this.lanes[i].connectAtEnd(this.lanes[j]);
                this.lanes[i+1].connectAtEnd(this.lanes[j+1]);
            }
            spawner.createSpawner(this.lanes[i]);
            spawner.createSpawner(this.lanes[i+1]);
        }
    
        this.post();
    }
}

class Roundabout extends AbstractCrossing{
    constructor(spawner){
        super(spawner);

        let laneWidth = 40;
        this.lanes = [
            new Lane(new Vector(drawWidth*0.6, drawHeight*0.3+laneWidth), new Vector(drawWidth*0.4, drawHeight*0.3 + laneWidth), laneWidth), // Roundabout
            new Lane(new Vector(drawWidth*0.7, drawHeight*0.6+laneWidth), new Vector(drawWidth*0.7, drawHeight*0.4 + laneWidth), laneWidth),
            new Lane(new Vector(drawWidth*0.4, drawHeight*0.7+laneWidth), new Vector(drawWidth*0.6, drawHeight*0.7 + laneWidth), laneWidth),
            new Lane(new Vector(drawWidth*0.3, drawHeight*0.4+laneWidth), new Vector(drawWidth*0.3, drawHeight*0.6 + laneWidth), laneWidth),
            new Lane(new Vector(drawWidth*0.25, drawHeight*0.25), new Vector(drawWidth*0, drawHeight*0), laneWidth), // Off ramps
            new Lane(new Vector(drawWidth*0.75, drawHeight*0.3), new Vector(drawWidth*1, drawHeight*0), laneWidth),
            new Lane(new Vector(drawWidth*0.75, drawHeight*0.85), new Vector(drawWidth*1, drawHeight*1), laneWidth),
            new Lane(new Vector(drawWidth*0.25, drawHeight*0.75), new Vector(drawWidth*0, drawHeight*1), laneWidth),
            new Lane(new Vector(drawWidth*0.7, drawHeight*0),new Vector(drawWidth*0.7, drawHeight*0.25),  laneWidth), // On ramps
            new Lane(new Vector(drawWidth*1, drawHeight*0.7+laneWidth),new Vector(drawWidth*0.75, drawHeight*0.7+laneWidth),  laneWidth),
            new Lane(new Vector(drawWidth*0.3, drawHeight*1), new Vector(drawWidth*0.3, drawHeight*0.85), laneWidth),
            new Lane(new Vector(drawWidth*0, drawHeight*0.3+laneWidth), new Vector(drawWidth*0.25, drawHeight*0.3 + laneWidth), laneWidth),
        ];

        for(let i = 0; i<4; i++){
            this.lanes[i].connectAtEnd(this.lanes[(i+3)%4]);
        }

        for(let i = 0; i<4; i++){
            this.lanes[i+8].connectAtEnd(this.lanes[i]);
        }

        for(let i = 0; i<4; i++){
            this.lanes[i].connectAtEnd(this.lanes[i+4]);
        }

        for(let i = 0; i<4; i++){
            spawner.createSpawner(this.lanes[i+8]);
        }

        
    
        this.post();
    }
}
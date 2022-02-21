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
                if(j-i == 2 || j-i == 1) continue;

                this.lanes[i].connectAtEnd(this.lanes[j]);
                this.lanes[i+1].connectAtEnd(this.lanes[j+1]);
            }
            spawner.createSpawner(this.lanes[i]);
            spawner.createSpawner(this.lanes[i+1]);
        }
    
        this.post();
    }
}
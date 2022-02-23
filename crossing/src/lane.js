class Lane{
    constructor(start, end, width){
        this.start = start;
        this.end = end;
        this.width = width;
        this.halfWidth = width/2;
        this.connectedAtStart = [];
        this.connectedAtEnd = [];
        this.vehicles = [];

        this.dy = this.end.x - this.start.x;
        this.dx = this.end.y - this.start.y;
        this.d = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        if(this.d == 0){
            this.dx = this.dx;
            this.dy = this.dy;
        }else{
            this.dx = this.dx/this.d;
            this.dy = this.dy/this.d;
        }

        this.x1 = this.start.x + this.halfWidth*this.dx;
        this.y1 = this.start.y - this.halfWidth*this.dy;
        this.x2 = this.start.x - this.halfWidth*this.dx;
        this.y2 = this.start.y + this.halfWidth*this.dy;

        this.x3 = this.end.x - this.halfWidth*this.dx;  
        this.y3 = this.end.y + this.halfWidth*this.dy;
        this.x4 = this.end.x + this.halfWidth*this.dx;
        this.y4 = this.end.y - this.halfWidth*this.dy;

        this.length = this.calculateLength();
    }

    draw(){
        stroke(0);
        strokeWeight(1);
        fill('rgb(200,200,200)');
        quad(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4);

        noStroke();
        fill(0);

        this.drawConnections(this.connectedAtStart);
        this.drawConnections(this.connectedAtEnd);
    }

    drawConnections(connections){
        for(let con of connections){
            con.draw();
        }
    }

    connectAtStart(lane){
        this.connectAt(lane, this.start, lane.start);

    }

    connectAtEnd(lane){
        this.connectAt(lane, this.end, lane.start);
    }

    getNextDrivingOn(progression,vehicle){
        if(progression <= 0){
            this.removeVehicle(vehicle);
            return this.connectedAtStart[parseInt(Math.random()*this.connectedAtStart.length)];
        }else if(progression >= 1){
            this.removeVehicle(vehicle);
            return this.connectedAtEnd[parseInt(Math.random()*this.connectedAtEnd.length)];
        }else{
            return null;
        }
    }

    removeVehicle(vehicle){
        this.vehicles.splice(this.vehicles.indexOf(vehicle), 1);
    }

    addVehicle(vehicle){
        this.vehicles.push(vehicle);
    }

    connectAt(lane, fromAt, toAt){
        colorMode(HSB);
        let c = color(map(Math.random(), 0.0, 1.0, 0, 360),255,255);
        this.connectedAtEnd.push(
            new Connection(
                this, 
                lane, 
                fromAt, 
                toAt, 
                c));
    }

    shouldWait(progression, vehicle){
        let wait = false;
        let length = this.getLength();

        for(let v of this.vehicles){
            if(v == vehicle) continue;
            let dist = v.drivingOnProgression*length - progression*length;
            if(dist > 0 && dist < vehicle.height*1.5){
                wait = true;
                break;
            }
        }
        if(wait) return wait;

        let connections = this.connectedAtEnd;
        if(vehicle.drivingTowards == ToStart){
            connections = this.connectedAtStart;
        }

        let distToNext = (1-vehicle.relativeProgression())*this.getLength();
        if(distToNext > vehicle.height*1.5);

        for(let c of connections){
            let inverse = false;
            if(c.toLoc == this) inverse = true;

            let len = c.getLength();
            for(let v of c.vehicles){
                let progressRelativeToUs = v.drivingOnProgression;
                if(inverse) progressRelativeToUs = 1-progressRelativeToUs;

                let distOnCon = len*progressRelativeToUs;
                if(distOnCon + distToNext < vehicle.height*1.5){
                    wait = true;
                    break;
                }
            }
            if(wait) break;
        }
        return wait;
    }

    getLocationAt(progression){
        let dx = this.end.x - this.start.x;
        let dy = this.end.y - this.start.y;
        dx = dx*progression;
        dy = dy*progression;
        return new Location(new Vector(dx+this.start.x,dy+this.start.y), new Vector(this.dx, this.dy));
    }

    getLength(){
        return this.length;
    }

    calculateLength(){
        let dx = this.start.x - this.end.x;
        let dy = this.start.y - this.end.y;
        return Math.sqrt(dy*dy+dx*dx);
    }

    spawnVehicle(){
        let x = this.start.x;
        let y = this.start.y;
        let dx = this.end.x - x;
        let dy = this.end.y - y;
      
        let v = vehicleFactory.CreateNewVehicle(x,y,dx,dy);
        v.setDrivingOn(this, ToEnd);
        this.addVehicle(v);
      
        vehicles.push(v);
    }
}

class ExitLane extends Lane{
    shouldWait(progression, vehicle){
        return false;
    }
}
class Connection{
    constructor(from, to, fromLoc, toLoc, color){
        this.from = from;
        this.to = to;
        this.fromLoc = fromLoc;
        this.toLoc = toLoc;
        this.color = color;

        let bezierMult = 90;

        this.x1 = this.fromLoc.x;
        this.y1 = this.fromLoc.y;
        this.x4 = this.toLoc.x;
        this.y4 = this.toLoc.y;    
        this.x2 = this.x1 + this.from.dy*bezierMult;
        this.x3 = this.x4 - this.to.dy*bezierMult;
        this.y2 = this.y1 + this.from.dx*bezierMult;
        this.y3 = this.y4 - this.to.dx*bezierMult;
        
        this.length = this.calculateLength();

        this.conflicts = [];
        this.vehicles = [];
    }

    // Check all conflicts with other connections
    // If all are clear, the vehicle can progress
    shouldWait(progression, vehicle){
        let wait = false;

        let aroundBounds = vehicle.height/(this.getLength()) * 1.0;
        for(let conflict of this.conflicts){
            if(conflict.conA === this){
                wait = this.checkConflict(conflict, vehicle, progression, conflict.fromA-aroundBounds, conflict.toA);
            }else if(conflict.conB === this){
                wait = this.checkConflict(conflict, vehicle, progression, conflict.fromB-aroundBounds, conflict.toB);
            }
            if(wait){
                conflict.draw();
                break;
            }
        }
        return wait;
    }

    checkConflict(conflict, vehicle, progression, from, to){
        let onSection = this.onSection(progression, from, to);
        let occupied = conflict.isOccupied();
        let occupiedByUs = conflict.isOccupiedBy(vehicle);
        if(onSection){
            if(occupied){
                if(!occupiedByUs){
                    return true;
                }
                return !occupiedByUs;
            }
            conflict.setOccupation(vehicle);
        }else if(occupiedByUs){
            conflict.setOccupation(null);
        }
        return false;
    }

    onSection(progression, from, to){
        return from <= progression && progression <= to;
    }

    getLength(){
        return this.length;
    }

    getLocationAt(progression){
        let x = bezierPoint(this.x1, this.x2, this.x3, this.x4, progression);
        let y = bezierPoint(this.y1, this.y2, this.y3, this.y4, progression);

        let ty = bezierTangent(this.x1, this.x2, this.x3, this.x4, progression);
        let tx = bezierTangent(this.y1, this.y2, this.y3, this.y4, progression);

        return new Location(new Vector(x,y), new Vector(tx,ty));
    }

    getNextDrivingOn(progression,vehicle){
        if(progression <= 0){
            return this.from;
        }else if(progression >= 1){
            return this.to;
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

    calculateLength(){
        let length = 0;
        let steps = 10;
        let lastX = this.x1;
        let lastY = this.y1;

        for (let i = 1; i <= steps; i++) {
            let t = i / steps;
            let x = bezierPoint(this.x1, this.x2, this.x3, this.x4, t);
            let y = bezierPoint(this.y1, this.y2, this.y3, this.y4, t);
            
            let dx = x - lastX;
            let dy = y - lastY;
            length += Math.sqrt(dx*dx+dy*dy);

            lastX = x;
            lastY = y;
        }
        return length;
    }

    draw(){
        if(Environment.displayConnections){
            stroke(this.color);  
            strokeWeight(3);
            noFill();
            bezier(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4);
        }
    }

    addConflict(conflict){
        this.conflicts.push(conflict);
    }

    getConflicts(){
        return this.conflicts;
    }
}

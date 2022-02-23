class BlockSectionVisitor{
    constructor(detail, minDistance){
        this.detail = detail;
        this.minDistance = minDistance;
    }

    findConflicts(a, b){
        let t = 1/this.detail;

        let measuringConflict = false;
        let measureA = 0;
        let measureB = 0;

        let conflicts = [];

        for(let i = t; i <= 1; i+=t){
            for(let j = t; j <= 1; j+=t){
                let xa = bezierPoint(a.x1, a.x2, a.x3, a.x4, i);
                let ya = bezierPoint(a.y1, a.y2, a.y3, a.y4, i);

                let xb = bezierPoint(b.x1, b.x2, b.x3, b.x4, j);
                let yb = bezierPoint(b.y1, b.y2, b.y3, b.y4, j);

                let dx = Math.abs(xb-xa);
                let dy = Math.abs(yb-ya);

                let d = Math.sqrt(dx*dx+dy*dy);
                if(d<=this.minDistance){
                    // Conflict
                    if(!measuringConflict){
                        measuringConflict = true;
                        measureA = i;
                        measureB = j;
                    }
                }else{
                    if(measuringConflict){
                        measuringConflict = false;
                        this.addConflict(conflicts,a,b,measureA,i,measureB,j,t);
                    }
                }
            }

            if(measuringConflict){
                measuringConflict = false;
                this.addConflict(conflicts,a,b,measureA,i,measureB,1,t);
            }
        }

        return conflicts;
    }

    addConflict(conflicts, a,b, fromA, toA, fromB, toB, t){
        let c = new ConflictSection(a, b, fromA, toA, fromB, toB, t);
        conflicts.push(c);
        a.addConflict(c);
        b.addConflict(c);
    }

    collectAllConflicts(crossing){
        console.log("Analysing crossing for conflicts...");

        let allConflicts = [];
        let connections = crossing.getConnections();

        for(let i=0; i<connections.length; i++){
            for(let j = i+1; j<connections.length; j++){
                let a = connections[i].toDrivable;
                let b = connections[j].toDrivable;
                let conflicts = this.findConflicts(a, b);

                if(conflicts.length != 0){
                    Array.prototype.push.apply(allConflicts, conflicts);
                    console.log("Adding " + conflicts.length + " conflicts");
                }
            }
        }

        console.log("Analysed crossing successfully!");
        console.log("Found " + allConflicts.length + " conflicts");

        return allConflicts;
    }

    visitCrossing(crossing){
        let allConflicts = this.collectAllConflicts(crossing);

        return allConflicts;
    }
}